// pages/api/createUser.js
import dbConnect from '../../utils/dbConnect'; // Adjust the path to your dbConnect utility
import Transaction from '../../models/transaction';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    try {
      const transaction = await Transaction.create(req.body); // Create a new transaction in the database
      res.status(201).json({ success: true, transaction });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === 'GET') {
    try {
      const transactions = await Transaction.find({}); // Fetch all transactions from the database
      res.status(200).json({ success: true, transactions });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
