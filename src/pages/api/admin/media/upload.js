import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { Formidable } from 'formidable';
import FormData from 'form-data';
import { Blob } from 'node-fetch';

import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

// async function preparePost(filename, contentType) {
//   const url = `${process.env.VIDASHY_URL}6d498a2a94a3/quoter/media`;

//   const response = await fetch(url, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${process.env.VIDASHY_API_KEY}`,
//     },
//     body: JSON.stringify({ filename, contentType }),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     return data;
//   } else {
//     console.error('Error:');
//     return null;
//   }
// }

async function preparePost(filename, contentType) {
  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const Key = uuidv4();
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    const urlMedia = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${Key}`;

    return { url, fields, urlMedia, mediaKey: Key };
  } catch (error) {
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

    const { fieldsForm, files } = await new Promise((resolve, reject) => {
      const form = new Formidable();
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        resolve({ fields, files });
      });
    });

    const { filename, contentType } = ((files) => {
      if (!files || !files.file || !files.file[0]) {
        return { filename: null, contentType: null };
      }
      return {
        filename: files.file[0].originalFilename,
        contentType: files.file[0].mimetype,
      };
    })(files);

    const presignedPost = await preparePost(filename, contentType);

    if (!presignedPost)
      return res.status(500).send({ message: 'Image could not be processed' });

    const { url, fields, mediaKey, urlMedia } = presignedPost;

    res.status(200).json({ url, fields, mediaKey, urlMedia });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}
