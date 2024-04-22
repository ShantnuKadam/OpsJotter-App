// pages/api/createUser.js
import dbConnect from '../../utils/dbConnect'; // Adjust the path to your dbConnect utility
import Transaction from '../../models/transaction';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    try {
      const user = await Transaction.create(req.body); // Create a new user in the database
      res.status(201).json({ success: true, Transaction });
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
