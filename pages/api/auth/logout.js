import pool from '../../../lib/db';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  const { refreshToken } = cookie.parse(req.headers.cookie || '');
  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      await pool.execute('UPDATE users SET refresh_token = NULL WHERE id = ?', [payload.id]);
    } catch {}
  }
  res.setHeader('Set-Cookie', cookie.serialize('refreshToken', '', {
    httpOnly: true, path: '/', maxAge: 0
  }));
  res.status(200).json({ message: 'Logged out' });
}
