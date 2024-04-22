// pages/api/createUser.js
import dbConnect from '../../utils/dbConnect'; // Adjust the path to your dbConnect utility
import client from '../../models/client';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    try {
      const user = await client.create(req.body); // Create a new user in the database
      res.status(201).json({ success: true, client });
      console.log(user);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
