import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { sanitizeOBJ } from '@/utils/utils';

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

async function createRecord(user, record) {
  const url = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/tickets`;
  try {
    const new_record = sanitizeOBJ({
      id: generateUUID(),
      title: record.title,
      userOwner: {
        userid: user.userid,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      originalMessage: record.originalMessage,
      responses: [],
      status: 'active',
    });

    const response = await axios({
      method: 'post',
      url,
      headers: {
        Authorization: `Bearer ${process.env.VIRTEL_DASHBOARD_API_KEY}`,
      },
      data: new_record,
    });
    const ticket = response.data || null;

    // if (ticket !== null) {
    //   const notification_new = sanitizeOBJ({
    //     id: generateUUID(),
    //     title: 'Nuevo Ticket Recibido',
    //     message: `Se ha recibido un nuevo ticket`,
    //     object: 'tickets',
    //     objectid: new_record.id,
    //     userid: '',
    //     role: 'admin',
    //     status: 'unread',
    //   });

    //   const url_notification = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/notifications`;

    //   axios({
    //     method: 'post',
    //     url: url_notification,
    //     headers: {
    //       Authorization: `Bearer ${process.env.VIRTEL_DASHBOARD_API_KEY}`,
    //     },
    //     data: notification_new,
    //   });
    // }

    return ticket !== null ? new_record : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { id: userid, role, username, email, name } = token;

    const { record } = req.body;

    const validation = {};

    if (!record.title || record.title === '') {
      validation.title = 'Field Required';
    }
    if (!record.originalMessage || record.originalMessage === '') {
      validation.originalMessage = 'Field Required';
    }

    //EVALUATE IF VALIDATION IS NOT EMPTY
    if (Object.keys(validation).length > 0) {
      return res.status(500).send({
        message: 'Record could not be processed',
        validation,
      });
    }

    const response = await createRecord(
      { userid, role, username, email, name },
      record
    );

    if (!response)
      return res
        .status(500)
        .send({ message: 'Record could not be processed ' });

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
