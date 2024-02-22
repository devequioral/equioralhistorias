import axios from 'axios';
import bcryptjs from 'bcryptjs';
import { getToken } from 'next-auth/jwt';
import { sanitizeOBJ } from '@/utils/utils';

function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0;
    // eslint-disable-next-line no-bitwise
    d = Math.floor(d / 16);
    // eslint-disable-next-line no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

async function createRecord(userid, record) {
  const url = `${process.env.VIDASHY_URL}${process.env.VIDASHY_ORGANIZATION}/${process.env.VIDASHY_DATABASE}/users`;
  try {
    const new_record = sanitizeOBJ({
      id: generateUUID(),
      name: record.name,
      username: record.username,
      email: record.email,
      role: record.role,
      address: record.address,
      invoice_to: record.invoice_to,
      contact_name: record.contact_name,
      contact_phone: record.contact_phone,
    });

    if (record.password) {
      const salt = `$2a$10$${process.env.BCRIPT_SALT}`;
      const hash = bcryptjs.hashSync(record.password, salt);
      new_record.password = hash;
    }
    const response = await axios({
      method: 'post',
      url,
      headers: {
        Authorization: `Bearer ${process.env.VIDASHY_API_KEY}`,
      },
      data: new_record,
    });
    return response.data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { id: userid, role } = token;

    if (role !== 'admin') {
      return res.status(401).send({ message: 'Not authorized' });
    }

    const { record } = req.body;

    const validation = {};

    if (!record.name || record.name === '') {
      validation.name = 'Field Required';
    }
    if (!record.username || record.username === '') {
      validation.username = 'Field Required';
    }
    if (!record.email || record.email === '') {
      validation.email = 'Field Required';
    }
    if (!record.role || record.role === '') {
      validation.role = 'Field Required';
    }
    if (!record.password || record.password === '') {
      validation.password = 'Field Required';
    }
    if (!record.address || record.address === '') {
      validation.address = 'Field Required';
    }
    if (!record.invoice_to || record.invoice_to === '') {
      validation.invoice_to = 'Field Required';
    }
    if (!record.contact_name || record.contact_name === '') {
      validation.contact_name = 'Field Required';
    }
    if (!record.contact_phone || record.contact_phone === '') {
      validation.contact_phone = 'Field Required';
    }

    //EVALUATE IF VALIDATION IS NOT EMPTY
    if (Object.keys(validation).length > 0) {
      return res.status(500).send({
        message: 'Record could not be processed',
        validation,
      });
    }

    const response = await createRecord(userid, record);

    if (!response)
      return res
        .status(500)
        .send({ message: 'Record could not be processed ' });

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
