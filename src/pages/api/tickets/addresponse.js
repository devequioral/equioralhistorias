import axios from 'axios';
import { getRecords } from '@/virtel-sdk/dist/backend';
import { getToken } from 'next-auth/jwt';
import { filterBy, filterValue } from '@/utils/filters';

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

async function getRecord(recordid) {
  return await getRecords({
    backend_url: process.env.VIRTEL_DASHBOARD_URL,
    organization: process.env.VIRTEL_DASHBOARD_ORGANIZATION,
    database: process.env.VIRTEL_DASHBOARD_DATABASE,
    object: 'tickets',
    api_key: process.env.VIRTEL_DASHBOARD_API_KEY,
    params: {
      filterBy: filterBy({ id: recordid }),
      filterValue: filterValue({ id: recordid }),
    },
  });
}

async function updateRecord(user, record, ticket_response) {
  const url = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/tickets`;

  try {
    if (ticket_response) {
      record.responses.push({
        user: {
          userid: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        message: ticket_response,
        date: new Date().toISOString(),
      });
    }
    //VERIFY IF RECORD IS CLOSE
    const ticketDB = await getRecord(record.id);
    if (ticketDB && ticketDB.records && ticketDB.records.length > 0) {
      if (ticketDB.records[0].status === 'close') {
        return null;
      }
    }

    //UPDATE RECORD
    const record_update = {
      id: record.id,
      title: record.title,
      responses: record.responses,
    };

    const response = await axios({
      method: 'patch',
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.VIRTEL_DASHBOARD_API_KEY}`,
      },
      data: record_update,
    });

    const ticket = response.data || null;

    if (ticket !== null) {
      const notification_new = {
        id: generateUUID(),
        title: 'Nueva Respuesta Recibida',
        message: `Se ha recibido una nueva respuesta en su ticket`,
        object: 'tickets',
        objectid: record_update.id,
        userid: user.role === 'admin' ? record.userOwner.userid : '',
        role: user.role === 'admin' ? 'regular' : 'admin',
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

    return ticket !== null ? record_update : null;
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

    const { record, ticket_response } = req.body;

    const response = await updateRecord(
      { id: userid, role, username, email, name },
      record,
      ticket_response
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
