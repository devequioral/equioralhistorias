import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { sanitizeOBJ } from '@/utils/utils';

async function updateRecord(userid, record) {
  const url = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/addons`;

  try {
    const record_update = sanitizeOBJ({
      id: record.id,
      category: record.category,
      productID: record.productID,
      productName: record.productName,
      text: record.text,
      help: record.help,
      percent: record.percent,
    });

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

    if (role !== 'admin') {
      return res.status(401).send({ message: 'Not authorized' });
    }

    const { record } = req.body;

    const validation = {};

    if (!record.text || record.text === '') {
      validation.text = 'Field Required';
    }
    if (!record.productName || record.productName === '') {
      validation.productName = 'Field Required';
    }
    if (!record.help || record.help === '') {
      validation.help = 'Field Required';
    }
    if (!record.percent || record.percent === '') {
      validation.percent = 'Field Required';
    }
    if (record.percent && isNaN(Number.parseInt(record.percent))) {
      validation.percent = 'This field must be a number';
    }
    if (!record.category || record.category === '') {
      validation.category = 'Field Required';
    }
    if (!record.productName || record.productName === '') {
      validation.productName = 'Field Required';
    }

    //EVALUATE IF VALIDATION IS NOT EMPTY
    if (Object.keys(validation).length > 0) {
      return res.status(500).send({
        message: 'Record could not be processed',
        validation,
      });
    }

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
