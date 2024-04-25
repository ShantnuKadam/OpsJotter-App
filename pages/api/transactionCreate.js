import dbConnect from '../../utils/dbConnect'; // Adjust the path to your dbConnect utility
import Transaction from '../../models/transaction';

export default async function handler(req, res) {
  const { method, query: { id } } = req;
  

  await dbConnect();

  if (method === 'POST') {
    try {
      const transaction = await Transaction.create(req.body); // Create a new transaction
      res.status(201).json({ success: true, transaction });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === 'GET' && !id) {
    try {
      const transactions = await Transaction.find({}); // Fetch all transactions
      res.status(200).json({ success: true, transactions });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === 'GET' && id) {
    try {
      const transaction = await Transaction.findById(id); // Fetch a single transaction by ID
      if (!transaction) {
        return res.status(404).json({ success: false, error: 'Transaction not found' });
      }
      res.status(200).json({ success: true, transaction });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === 'PUT' && id) {
    try {
      const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      if (!transaction) {
        return res.status(404).json({ success: false, error: 'Transaction not found' });
      }
      res.status(200).json({ success: true, transaction });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
