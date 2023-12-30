import { getToken } from 'next-auth/jwt';
import { getRecords } from '@/virtel-sdk/dist/backend';
import { filterBy, filterValue } from '@/utils/filters';

async function getOrder(userid, order_id) {
  return await getRecords({
    backend_url: process.env.VIRTEL_DASHBOARD_URL,
    organization: process.env.VIRTEL_DASHBOARD_ORGANIZATION,
    database: process.env.VIRTEL_DASHBOARD_DATABASE,
    object: 'orders',
    api_key: process.env.VIRTEL_DASHBOARD_API_KEY,
    params: {
      filterBy: filterBy(userid, 'all', 'id'),
      filterValue: filterValue(userid, 'all', order_id),
    },
  });
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { order_id } = req.query;
    const { id: userid, role } = token;

    //const order = await getOrder(userid, order_id);
    let order;

    //IF USER ROLE IS ADMIN
    if (role === 'admin') {
      order = await getOrder(null, order_id);
    }
    //IF USER ROLE IS NOT ADMIN
    else {
      order = await getOrder(userid, order_id);
    }

    if (!order) return res.status(404).send({ message: 'Order Not found' });

    res.status(200).json({ order });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
