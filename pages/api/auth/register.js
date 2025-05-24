import pool from '../../../lib/db'; // Adjust the import path as necessary
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hash]
  );
  res.status(201).json({ message: 'User created', userId: result.insertId });
}
