import { getToken } from 'next-auth/jwt';
import { getRecords } from '@/virtel-sdk/dist/backend';
import { filterBy, filterValue } from '@/utils/filters';

async function getOrder(userid, order_id) {
  return await getRecords({
    backend_url: process.env.VIDASHY_URL,
    organization: process.env.VIDASHY_ORGANIZATION,
    database: process.env.VIDASHY_DATABASE,
    object: 'orders',
    api_key: process.env.VIDASHY_API_KEY,
    params: {
      filterBy: filterBy({ userid, id: order_id }),
      filterValue: filterValue({ userid, id: order_id }),
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

    if (!order || !order.records || order.records.length === 0)
      return res.status(404).send({ order, message: 'Order Not found' });

    //REMOVE SENSIBLE DATA OF RECORDS
    order.records.map((_record) => {
      delete _record._id;
      delete _record.updatedAt;
    });

    res.status(200).json({ order });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
