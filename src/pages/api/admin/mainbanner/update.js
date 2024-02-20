import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { sanitizeOBJ } from '@/utils/utils';

async function updateRecord(userid, record) {
  const url = `${process.env.VIDASHY_URL}6d498a2a94a3/quoter/mainbanner`;

  try {
    const record_update = sanitizeOBJ({
      id: record.id,
      title: record.title,
      description: record.description,
      url: record.url,
      image: record.image,
    });

    const response = await axios({
      method: 'patch',
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.VIDASHY_API_KEY}`,
      },
      data: record_update,
    });

    const record_response = response.data || null;

    return record_response;
  } catch (error) {
    //console.error(error);
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

    if (!record.title || record.title === '') {
      validation.title = 'Field Required';
    }
    if (!record.description || record.description === '') {
      validation.description = 'Field Required';
    }
    if (!record.url || record.url === '') {
      validation.url = 'Field Required';
    }
    if (!record.image.src || record.image.src === '') {
      validation.image = 'Field Required';
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
