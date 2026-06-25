import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'rayaru_gold';

let cachedClient = null;
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGO_URL);
    await cachedClient.connect();
  }
  return cachedClient.db(DB_NAME);
}

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('hex');
}

async function ensureSeed(db) {
  const settings = db.collection('settings');
  const price = await settings.findOne({ key: 'gold_price' });
  if (!price) {
    await settings.insertOne({
      key: 'gold_price',
      price_24k: 10350,
      price_22k: 9490,
      updated_at: new Date().toISOString(),
    });
  }
  const admins = db.collection('admins');
  const adminCount = await admins.countDocuments();
  if (adminCount === 0) {
    await admins.insertOne({
      id: uuidv4(),
      username: 'admin',
      password_hash: sha256('rayaru@2025'),
      created_at: new Date().toISOString(),
    });
  }
}

async function getSession(db, token) {
  if (!token) return null;
  const sessions = db.collection('sessions');
  return await sessions.findOne({ token });
}

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

async function handle(request, { params }) {
  const db = await getDb();
  await ensureSeed(db);

  const resolved = await params;
  const pathArr = resolved?.path || [];
  const route = '/' + pathArr.join('/');
  const method = request.method;

  try {
    // Health
    if (route === '/' || route === '/health') {
      return json({ ok: true, service: 'Rayaru Gold API' });
    }

    // Public: Get gold price
    if (route === '/gold-price' && method === 'GET') {
      const settings = db.collection('settings');
      const price = await settings.findOne({ key: 'gold_price' });
      return json({
        price_24k: price?.price_24k || 0,
        price_22k: price?.price_22k || 0,
        updated_at: price?.updated_at,
      });
    }

    // Public: Contact form submission
    if (route === '/contact' && method === 'POST') {
      const body = await request.json();
      const { name, phone, email, message } = body || {};
      if (!name || !phone) {
        return json({ error: 'Name and phone are required' }, 400);
      }
      const contacts = db.collection('contacts');
      await contacts.insertOne({
        id: uuidv4(),
        name,
        phone,
        email: email || '',
        message: message || '',
        created_at: new Date().toISOString(),
      });
      return json({ success: true });
    }

    // Admin login
    if (route === '/admin/login' && method === 'POST') {
      const body = await request.json();
      const { username, password } = body || {};
      const admins = db.collection('admins');
      const admin = await admins.findOne({
        username,
        password_hash: sha256(password || ''),
      });
      if (!admin) return json({ error: 'Invalid credentials' }, 401);

      const token = uuidv4() + '-' + uuidv4();
      const sessions = db.collection('sessions');
      await sessions.insertOne({
        token,
        username: admin.username,
        created_at: new Date().toISOString(),
      });
      return json({ token, username: admin.username });
    }

    // Admin verify
    if (route === '/admin/verify' && method === 'GET') {
      const token = request.headers.get('x-admin-token');
      const session = await getSession(db, token);
      if (!session) return json({ error: 'Unauthorized' }, 401);
      return json({ ok: true, username: session.username });
    }

    // Admin logout
    if (route === '/admin/logout' && method === 'POST') {
      const token = request.headers.get('x-admin-token');
      if (token) {
        await db.collection('sessions').deleteOne({ token });
      }
      return json({ success: true });
    }

    // Admin update gold price
    if (route === '/admin/gold-price' && method === 'POST') {
      const token = request.headers.get('x-admin-token');
      const session = await getSession(db, token);
      if (!session) return json({ error: 'Unauthorized' }, 401);

      const body = await request.json();
      const price_24k = Number(body?.price_24k);
      const price_22k = Number(body?.price_22k);
      if (!price_24k || !price_22k || price_24k <= 0 || price_22k <= 0) {
        return json({ error: 'Invalid prices' }, 400);
      }
      const settings = db.collection('settings');
      const updated_at = new Date().toISOString();
      await settings.updateOne(
        { key: 'gold_price' },
        { $set: { price_24k, price_22k, updated_at } },
        { upsert: true }
      );
      return json({ success: true, price_24k, price_22k, updated_at });
    }

    // Admin: list contacts
    if (route === '/admin/contacts' && method === 'GET') {
      const token = request.headers.get('x-admin-token');
      const session = await getSession(db, token);
      if (!session) return json({ error: 'Unauthorized' }, 401);
      const contacts = await db
        .collection('contacts')
        .find({}, { projection: { _id: 0 } })
        .sort({ created_at: -1 })
        .limit(50)
        .toArray();
      return json({ contacts });
    }

    return json({ error: 'Not found', route, method }, 404);
  } catch (e) {
    return json({ error: e.message || 'Server error' }, 500);
  }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const DELETE = handle;
export const PATCH = handle;
