import { getRecords } from '@/vidashy-sdk/dist/backend';
import { getToken } from 'next-auth/jwt';
import { filterBy, filterValue } from '@/utils/filters';

async function listRecords(start, end) {
  return await getRecords({
    backend_url: process.env.VIDASHY_URL,
    organization: process.env.VIDASHY_ORGANIZATION,
    database: process.env.VIDASHY_DATABASE,
    object: 'notifications',
    api_key: process.env.VIDASHY_API_KEY,
    params: {
      filterBy: filterBy({
        role: 'admin',
        status: 'pending',
      }),
      filterValue: filterValue({
        role: 'admin',
        status: 'pending',
      }),
      page: 1,
      pageSize: 200,
    },
  });
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token)
      return res.status(401).send({ data: {}, message: 'Not authorized' });

    const { start, end } = req.query;
    const { role } = token;

    if (role !== 'admin') {
      return res.status(401).send({ data: {}, message: 'Not authorized' });
    }

    let records;

    records = await listRecords(start, end);

    if (!records || !records.records || records.records.length === 0)
      return res
        .status(404)
        .send({ data: records, message: 'Records Not found' });

    //REMOVE SENSIBLE DATA OF RECORDS
    records.records.map((_record) => {
      delete _record._id;
      delete _record.updatedAt;
    });

    res.status(200).json({ data: records });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
