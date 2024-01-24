import axios from 'axios';
import { getRecords } from '@/virtel-sdk/dist/backend';
import { getToken } from 'next-auth/jwt';
import { filterBy, filterValue } from '@/utils/filters';

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

    return response.data || null;
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
