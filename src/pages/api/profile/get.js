import { getToken } from 'next-auth/jwt';
import { getRecords } from '@/virtel-sdk/dist/backend';
import { filterBy, filterValue } from '@/utils/filters';

async function getProfile(userid, order_id) {
  return await getRecords({
    backend_url: process.env.VIRTEL_DASHBOARD_URL,
    organization: process.env.VIRTEL_DASHBOARD_ORGANIZATION,
    database: process.env.VIRTEL_DASHBOARD_DATABASE,
    object: 'users',
    api_key: process.env.VIRTEL_DASHBOARD_API_KEY,
    params: {
      filterBy: filterBy({ id: userid }),
      filterValue: filterValue({ id: userid }),
    },
  });
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { id: userid, role } = token;

    const profile = await getProfile(userid);

    if (!profile) return res.status(404).send({ message: 'Record Not found' });

    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
