import dbConnect from '../../utils/dbConnect';
import Client from '../../models/client';  // Ensure this import path is correct

export default async function handler(req, res) {
    const {
        method,
        query: { id }
    } = req;

    await dbConnect();

    if (method === 'GET') {
        if (id) {
            // Fetch a single client by ID
            try {
                const client = await Client.findById(id);
                if (!client) {
                    return res.status(404).json({ success: false, error: 'Client not found' });
                }
                res.status(200).json({ success: true, client });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        } else {
            // Fetch all clients
            try {
                const clients = await Client.find({});
                res.status(200).json({ success: true, clients });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        }
    } else if (method === 'POST') {
        // Create a new client
        try {
            const newClient = await Client.create(req.body);
            res.status(201).json({ success: true, client: newClient });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    } else if (method === 'PUT' && id) {
        // Update a client
        try {
            const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            });
            if (!updatedClient) {
                return res.status(404).json({ success: false, error: 'Client not found' });
            }
            res.status(200).json({ success: true, client: updatedClient });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
