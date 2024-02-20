import { getRecords } from '@/vidashy-sdk/dist/backend';
import { getToken } from 'next-auth/jwt';
import { filterBy, filterValue } from '@/utils/filters';

async function getOrders(userid, page = 1, pageSize = 5, status = 'all') {
  return await getRecords({
    backend_url: process.env.VIDASHY_URL,
    organization: process.env.VIDASHY_ORGANIZATION,
    database: process.env.VIDASHY_DATABASE,
    object: 'orders',
    api_key: process.env.VIDASHY_API_KEY,
    params: {
      filterBy: filterBy({ userid, status }),
      filterValue: filterValue({ userid, status }),
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
    const { id: userid, role } = token;

    let orders;

    //IF USER ROLE IS ADMIN
    if (role === 'admin') {
      orders = await getOrders(null, page, pageSize, status);
    }
    //IF USER ROLE IS NOT ADMIN
    else {
      orders = await getOrders(userid, page, pageSize, status);
    }

    if (!orders || !orders.records || orders.records.length === 0)
      return res.status(404).send({ orders, message: 'Orders Not found' });

    //REMOVE SENSIBLE DATA OF RECORDS
    orders.records.map((_record) => {
      delete _record._id;
      delete _record.updatedAt;
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
