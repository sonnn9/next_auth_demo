import pool from '../../../lib/db'; // Adjust the import path as necessary
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '../../../lib/jwt';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  const [[user]] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = signAccessToken({ id: user.id, username: user.username });
  const refreshToken = signRefreshToken({ id: user.id });

  await pool.execute('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, user.id]);

  res.setHeader('Set-Cookie', cookie.serialize('refreshToken', refreshToken, {
    httpOnly: true, path: '/', maxAge: 7*24*3600
  }));
  res.json({ accessToken });
}
