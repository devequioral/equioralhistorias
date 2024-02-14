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

async function createProduct(userid, product_request) {
  const url = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/products`;
  try {
    const product_new = sanitizeOBJ({
      id: generateUUID(),
      ...product_request,
    });
    const response = await axios({
      method: 'post',
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.VIRTEL_DASHBOARD_API_KEY}`,
      },
      data: product_new,
    });

    const product = response.data || null;

    return product_new;
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

    const { product_request } = req.body;

    const validation = {};

    if (!product_request.productName || product_request.productName === '') {
      validation.productName = 'Field Required';
    }
    if (!product_request.description || product_request.description === '') {
      validation.description = 'Field Required';
    }
    if (!product_request.status || product_request.status === '') {
      validation.status = 'Field Required';
    }

    //EVALUATE IF VALIDATION IS NOT EMPTY
    if (Object.keys(validation).length > 0) {
      return res.status(500).send({
        message: 'Product could not be processed',
        validation,
      });
    }

    const product = await createProduct(userid, product_request);

    if (!product)
      return res
        .status(500)
        .send({ message: 'Product could not be processed ' });

    res.status(200).json({ product });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
