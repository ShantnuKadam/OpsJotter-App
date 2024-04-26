import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/account';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { accountId, email, password } = req.body;
    //console.log("Received credentials:", accountId, email, password); 

    await dbConnect();

    try {
        const user = await User.findOne({
            email: email,
            accountId: accountId
        });

        console.log("Found user:", user); // Debug found user

        if (!user) {
            console.log("User not found with provided email or account ID");
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch); // Debug password comparison

        if (!isMatch) {
            console.log("Password does not match");
            return res.status(401).json({ message: 'Authentication failed' });
        }

        console.log("Authentication successful");
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        console.log("Error during authentication:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
