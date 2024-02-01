import axios from 'axios';
import { getToken } from 'next-auth/jwt';

function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0;
    // eslint-disable-next-line no-bitwise
    d = Math.floor(d / 16);
    // eslint-disable-next-line no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

async function updateRecord(record) {
  const url = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/orders`;

  try {
    const record_update = {
      id: record.id,
      status: record.status,
    };

    const response = await axios({
      method: 'patch',
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.VIRTEL_DASHBOARD_API_KEY}`,
      },
      data: record_update,
    });

    const order = response.data || null;

    if (order !== null) {
      const notification_new = {
        id: generateUUID(),
        title: 'Cambios en su cotización',
        message: `Su cotización ha cambiado de estado`,
        object: 'orders',
        objectid: record_update.id,
        userid: record.userid,
        role: 'regular',
        status: 'unread',
      };

      const url_notification = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/notifications`;

      axios({
        method: 'post',
        url: url_notification,
        headers: {
          Authorization: `Bearer ${process.env.VIRTEL_DASHBOARD_API_KEY}`,
        },
        data: notification_new,
      });
    }

    return order !== null ? record_update : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { id: userid, role } = token;

    if (role !== 'admin') {
      return res.status(401).send({ message: 'Not authorized' });
    }

    const { record } = req.body;

    const response = await updateRecord(record);

    if (!response)
      return res
        .status(500)
        .send({ message: 'Record could not be processed ' });

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
