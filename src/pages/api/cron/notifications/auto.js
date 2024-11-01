import axios from 'axios';
import { getRecords } from '@/vidashy-sdk/dist/backend';
import { filterBy, filterValue } from '@/utils/filters';
import { sanitizeOBJ } from '@/utils/utils';

function sendNotification(record) {
  let nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const textMessage = ` Este es un recordatotio desde: historias.equioral.com \n
  Title: ${record.title} \n
  Description: ${record.description} \n`;

  const textHtml = `<div> <h4>Este es un recordatotio desde: historias.equioral.com</h4>
  <p>Title: ${record.title}</p>
  <p>Description: ${record.description} </p>`;

  const mailData = {
    from: process.env.SMTP_USER,
    to: process.env.EMAIL_NOTIFICATIONS,
    subject: `Este es un recordatorio`,
    text: textMessage,
    html: textHtml,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log('Sorry, message not sent, please try again later!!');
    else console.log('Message sent successfully');
  });
}

async function updateRecord(record) {
  const url = `${process.env.VIDASHY_URL}${process.env.VIDASHY_ORGANIZATION}/${process.env.VIDASHY_DATABASE}/notifications`;

  try {
    //UPDATE RECORD
    const record_update = sanitizeOBJ({
      id: record.id,
      status: 'unread',
    });

    const response = await axios({
      method: 'patch',
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.VIDASHY_API_KEY}`,
      },
      data: record_update,
    });

    return response.data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function listRecords(page = 1, pageSize = 5) {
  return await getRecords({
    backend_url: process.env.VIDASHY_URL,
    organization: process.env.VIDASHY_ORGANIZATION,
    database: process.env.VIDASHY_DATABASE,
    object: 'notifications',
    api_key: process.env.VIDASHY_API_KEY,
    params: {
      filterBy: filterBy({ role: 'admin', status: 'pending' }),
      filterValue: filterValue({ role: 'admin', status: 'pending' }),
      page,
      pageSize,
    },
  });
}

export default async function handler(req, res) {
  try {
    const token = process.env.CRON_TOKEN;

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    if (token !== req.query.token) {
      return res.status(401).send({ message: 'Not authorized' });
    }

    const records = await listRecords(1, 20);

    if (!records || !records.records || records.records.length === 0)
      return res
        .status(404)
        .send({ data: records, message: 'Records Not found' });

    records.records.map((_record) => {
      const current_date = new Date();
      const record_date = new Date(_record.date);
      const notification = Number.parseInt(
        _record.notification.replace('min', '')
      );
      const difference =
        (current_date - record_date) / (1000 * 60) + notification;
      console.log(
        current_date.toISOString(),
        record_date.toISOString(),
        notification,
        difference
      );
      if (difference >= 0) {
        sendNotification(_record);
        updateRecord(_record);
      }
    });

    res.status(200).json({ success: true, records });
  } catch (error) {
    console.error('Error:', error);
  }
}
