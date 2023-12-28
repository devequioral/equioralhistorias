import axios from 'axios';
import { getToken } from 'next-auth/jwt';

async function getOrder(userid, order_id) {
  const url = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/orders?filterBy=userid,id&filterValue=${userid},${order_id}`;
  try {
    const response = await axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.VIRTEL_DASHBOARD_API_KEY}`,
      },
    });

    const orders = response.data || null;

    return orders;
  } catch (error) {
    //console.error(error);
    return null;
  }
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { order_id } = req.query;
    const { id: userid } = token;

    const order = await getOrder(userid, order_id);

    if (!order) return res.status(404).send({ message: 'Order Not found' });

    res.status(200).json({ order });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
