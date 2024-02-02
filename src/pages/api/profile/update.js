import axios from 'axios';
import bcryptjs from 'bcryptjs';
import { getToken } from 'next-auth/jwt';
import { sanitizeOBJ } from '@/utils/utils';

async function updateRecord(userid, record) {
  const url = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/users`;

  if (!record.id) return null;
  if (record.id !== userid) return null;

  try {
    const record_update = sanitizeOBJ({
      id: record.id,
      name: record.name,
      username: record.username,
      email: record.email,
      address: record.address,
      invoice_to: record.invoice_to,
      contact_name: record.contact_name,
      contact_phone: record.contact_phone,
    });

    if (record.password) {
      const salt = `$2a$10$${process.env.BCRIPT_SALT}`;
      const hash = bcryptjs.hashSync(record.password, salt);
      record_update.password = hash;
    }

    const response = await axios({
      method: 'patch',
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.VIRTEL_DASHBOARD_API_KEY}`,
      },
      data: record_update,
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

    const { record } = req.body;

    const response = await updateRecord(userid, record);

    if (!response)
      return res
        .status(500)
        .send({ message: 'Record could not be processed ' });

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}