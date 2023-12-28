import axios from 'axios';
import { getToken } from 'next-auth/jwt';

async function getOrders(userid, page = 1, pageSize = 5, status = 'all') {
  const filterBy = status === 'all' ? 'userid' : `userid,status`;
  const filterValue = status === 'all' ? userid : `${userid},${status}`;
  const url = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/orders?filterBy=${filterBy}&filterValue=${filterValue}&page=${page}&pageSize=${pageSize}`;
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

    const { page, pageSize, status } = req.query;
    const { id: userid } = token;

    const orders = await getOrders(userid, page, pageSize, status);

    if (!orders) return res.status(404).send({ message: 'Orders Not found' });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
