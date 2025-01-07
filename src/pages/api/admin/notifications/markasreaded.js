import axios from 'axios';
import { getRecords } from '@/vidashy-sdk/dist/backend';
import { getToken } from 'next-auth/jwt';
import { filterBy, filterValue } from '@/utils/filters';
import { sanitizeOBJ } from '@/utils/utils';

async function updateRecord(record) {
  //const url = `${process.env.VIDASHY_URL}6d498a2a94a3/quoter/notifications`;
  const url = `${process.env.VIDASHY_URL}${process.env.VIDASHY_ORGANIZATION}/${process.env.VIDASHY_DATABASE}/notifications`;

  try {
    //UPDATE RECORD
    const record_update = sanitizeOBJ({
      id: record.id,
      status: 'readed',
    });

    const response = await axios({
      method: 'patch',
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.VIDASHY_API_KEY}`,
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
      return res.status(401).send({ data: {}, message: 'Not authorized' });
    }

    const { record } = req.body;

    const response = await updateRecord(record);

    if (!response)
      return res
        .status(500)
        .send({ message: 'Record could not be processed ' });

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
