import pool from '../../../lib/db';
import { verifyRefreshToken, signAccessToken } from '../../../lib/jwt';
import cookie from 'cookie';

export default async function handler(req, res) {
  const { refreshToken } = cookie.parse(req.headers.cookie || '');
  if (!refreshToken) return res.status(401).end();

  let payload;
  try { payload = verifyRefreshToken(refreshToken); }
  catch { return res.status(403).end(); }

  const [[user]] = await pool.execute('SELECT * FROM users WHERE id = ?', [payload.id]);
  if (!user || user.refresh_token !== refreshToken) return res.status(403).end();

  const newAccessToken = signAccessToken({ id: user.id, username: user.username });
  res.json({ accessToken: newAccessToken });
}
