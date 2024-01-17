import { getToken } from 'next-auth/jwt';
import { getRecords } from '@/virtel-sdk/dist/backend';
import { filterBy, filterValue } from '@/utils/filters';

async function getRecord(productid, object) {
  return await getRecords({
    backend_url: process.env.VIRTEL_DASHBOARD_URL,
    organization: process.env.VIRTEL_DASHBOARD_ORGANIZATION,
    database: process.env.VIRTEL_DASHBOARD_DATABASE,
    object,
    api_key: process.env.VIRTEL_DASHBOARD_API_KEY,
    params: {
      filterBy: filterBy({ id: productid }),
      filterValue: filterValue({ id: productid }),
    },
  });
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { productid } = req.query;

    let record = await getRecord(productid, 'products');

    if (!record) return res.status(404).send({ message: 'Record Not found' });

    res.status(200).json({ record });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
