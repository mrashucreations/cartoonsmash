// File: netlify/functions/subscribe.mjs
// Netlify Function that de-duplicates emails using Netlify Blobs.
// Requires: Blobs enabled on your site (no extra setup for most plans).

import { getStore } from '@netlify/blobs';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const store = getStore('subscribers'); // a blob store named "subscribers"

  // Parse form-encoded or multipart
  const contentType = event.headers['content-type'] || '';
  let email = '';
  if (contentType.includes('application/json')) {
    const body = JSON.parse(event.body || '{}');
    email = (body.email || '').trim().toLowerCase();
  } else {
    // assume form data
    const params = new URLSearchParams(event.body || '');
    email = (params.get('email') || '').trim().toLowerCase();
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, body: 'Invalid email' };
  }

  const key = `email:${email}`;

  // Check if exists
  const already = await store.get(key);
  if (already) {
    return { statusCode: 409, body: 'Already subscribed' };
  }

  // Save a minimal record
  await store.setJSON(key, { email, ts: Date.now() });

  return { statusCode: 201, body: 'Subscribed' };
};