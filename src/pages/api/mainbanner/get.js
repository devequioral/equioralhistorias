import { getToken } from 'next-auth/jwt';
import { getRecords } from '@/virtel-sdk/dist/backend';
import { filterBy, filterValue } from '@/utils/filters';

async function getRecord() {
  return await getRecords({
    backend_url: process.env.VIDASHY_URL,
    organization: process.env.VIDASHY_ORGANIZATION,
    database: process.env.VIDASHY_DATABASE,
    object: 'mainbanner',
    api_key: process.env.VIDASHY_API_KEY,
    params: {},
  });
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { id: userid, role } = token;

    const record = await getRecord();

    if (!record || !record.records || record.records.length === 0)
      return res.status(404).send({ message: 'Record Not found' });

    //REMOVE SENSIBLE DATA OF RECORDS
    record.records.map((record) => {
      delete record._id;
      delete record.updatedAt;
      delete record.createdAt;
    });

    res.status(200).json({ record });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
