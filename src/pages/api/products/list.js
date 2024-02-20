import { getRecords } from '@/virtel-sdk/dist/backend';
import { getToken } from 'next-auth/jwt';
import { filterBy, filterValue } from '@/utils/filters';

async function getProducts(page = 1, pageSize = 5, status = 'all') {
  return await getRecords({
    backend_url: process.env.VIDASHY_URL,
    organization: process.env.VIDASHY_ORGANIZATION,
    database: process.env.VIDASHY_DATABASE,
    object: 'products',
    api_key: process.env.VIDASHY_API_KEY,
    params: {
      filterBy: filterBy({ status }),
      filterValue: filterValue({ status }),
      page,
      pageSize,
    },
  });
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { page, pageSize, status } = req.query;
    const { role } = token;

    let products;

    products = await getProducts(page, pageSize, status);

    if (!products || !products.records || products.records.length === 0)
      return res.status(404).send({ products, message: 'Products Not found' });

    //REMOVE SENSIBLE DATA OF RECORDS
    products.records.map((_record) => {
      delete _record._id;
      delete _record.updatedAt;
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
