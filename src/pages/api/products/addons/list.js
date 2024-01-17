import { getRecords } from '@/virtel-sdk/dist/backend';
import { getToken } from 'next-auth/jwt';
import { filterBy, filterValue } from '@/utils/filters';

async function listRecords(page = 1, pageSize = 5) {
  return await getRecords({
    backend_url: process.env.VIRTEL_DASHBOARD_URL,
    organization: process.env.VIRTEL_DASHBOARD_ORGANIZATION,
    database: process.env.VIRTEL_DASHBOARD_DATABASE,
    object: 'addons',
    api_key: process.env.VIRTEL_DASHBOARD_API_KEY,
    params: {
      filterBy: '',
      filterValue: '',
      page,
      pageSize,
    },
  });
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { page, pageSize } = req.query;
    const { role } = token;

    if (role !== 'admin') {
      return res.status(401).send({ message: 'Not authorized' });
    }

    const records = await listRecords(page, pageSize);

    if (!records) return res.status(404).send({ message: 'Records Not found' });

    res.status(200).json({ records });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
