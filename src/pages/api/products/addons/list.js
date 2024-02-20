import { getRecords } from '@/vidashy-sdk/dist/backend';
import { getToken } from 'next-auth/jwt';
import { filterBy, filterValue } from '@/utils/filters';

async function listRecords(object, productid) {
  return await getRecords({
    backend_url: process.env.VIDASHY_URL,
    organization: process.env.VIDASHY_ORGANIZATION,
    database: process.env.VIDASHY_DATABASE,
    object,
    api_key: process.env.VIDASHY_API_KEY,
    params: {
      filterBy: filterBy({ productID: productid }),
      filterValue: filterValue({ productID: productid }),
      page: 1,
      pageSize: 100,
    },
  });
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { productid } = req.query;

    const records = await listRecords('addons', productid);

    if (!records || !records.records || records.records.length === 0)
      return res.status(404).send({ records, message: 'Records Not found' });

    //REMOVE SENSIBLE DATA OF RECORDS
    records.records.map((_record) => {
      delete _record._id;
      delete _record.updatedAt;
    });

    res.status(200).json({ records });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
