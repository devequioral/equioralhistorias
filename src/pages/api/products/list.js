import { getRecords } from '@/virtel-sdk/dist/backend';
import { getToken } from 'next-auth/jwt';
import { filterBy, filterValue } from '@/utils/filters';

async function getProducts(page = 1, pageSize = 5, status = 'all') {
  return await getRecords({
    backend_url: process.env.VIRTEL_DASHBOARD_URL,
    organization: process.env.VIRTEL_DASHBOARD_ORGANIZATION,
    database: process.env.VIRTEL_DASHBOARD_DATABASE,
    object: 'products',
    api_key: process.env.VIRTEL_DASHBOARD_API_KEY,
    params: {
      filterBy: filterBy(null, status),
      filterValue: filterValue(null, status),
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

    //IF USER ROLE IS ADMIN
    if (role === 'admin') {
      products = await getProducts(page, pageSize, status);
    }
    //IF USER ROLE IS NOT ADMIN
    else {
      return res.status(401).send({ message: 'Not authorized' });
    }

    if (!products)
      return res.status(404).send({ message: 'Products Not found' });

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
