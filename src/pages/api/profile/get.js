import { getToken } from 'next-auth/jwt';
import { getRecords } from '@/virtel-sdk/dist/backend';
import { filterBy, filterValue } from '@/utils/filters';

async function getProfile(userid, order_id) {
  return await getRecords({
    backend_url: process.env.VIDASHY_URL,
    organization: process.env.VIDASHY_ORGANIZATION,
    database: process.env.VIDASHY_DATABASE,
    object: 'users',
    api_key: process.env.VIDASHY_API_KEY,
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

    if (!profile || !profile.records || profile.records.length === 0)
      return res.status(404).send({ profile, message: 'Record Not found' });

    //REMOVE SENSIBLE DATA OF RECORDS
    profile.records.map((record) => {
      delete record._id;
      delete record.updatedAt;
      delete record.createdAt;
      delete record.password;
      delete record.role;
    });

    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
