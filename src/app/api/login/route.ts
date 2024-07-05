import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Contoh pengecekan email dan password statis
    if (email === 'admin@example.com' && password === 'password123') {
      return res.status(200).json({ message: 'Login successful' });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
