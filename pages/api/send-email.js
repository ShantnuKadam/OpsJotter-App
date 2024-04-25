import nodemailer from 'nodemailer';

// Replace with your actual email credentials and service configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Adjust port as needed based on your service
  secure: false, // Adjust based on your service requirements
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD, // Store passwords securely using environment variables
  },
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const info = await transporter.sendMail({
        from: '"OpsJotter" kumarek675@gmail.com', // Customize sender details
        to: email,
        subject: 'Welcome to Your New Account!',
        text: `Thank you for creating an account with us! Please confirm your email address by clicking this link: [confirmation link]`, // Replace with actual confirmation logic
        html: `<!DOCTYPE html>
                <html>
                  <body>
                    <p>Thank you for creating an account with us!</p>
                  </body>
                </html>`, // Replace with actual confirmation link
      });

      console.log('Message sent:', info.messageId);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    // Handle other HTTP methods (if applicable)
    res.status(405).json({ message: 'Method not allowed' });
  }
}
