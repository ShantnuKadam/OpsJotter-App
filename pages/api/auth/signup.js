// pages/api/register.js
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/account';
import bcrypt from 'bcryptjs';
import { generateUniqueAccountId } from '../../../utils/generateUniqueAccountId';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace 'gmail' with your email provider if different
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { name, email, password } = req.body;
    await dbConnect();

    try {
        if (await User.findOne({ email })) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const accountId = await generateUniqueAccountId();

        const newUser = new User({ name, email, password: hashedPassword, accountId });
        await newUser.save();

        // Send email with the account ID
        const mailOptions = {
            from: 'your-email@example.com',
            to: email,
            subject: 'Welcome to Our Platform!',
            text: `Hello ${name},\n\nYour account has been created successfully! Your Account ID is ${accountId}.`,
            html: `<p>Hello ${name},</p><p>Your account has been created successfully! Your Account ID is <strong>${accountId}</strong>.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'User registered successfully!', accountId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default handler;
