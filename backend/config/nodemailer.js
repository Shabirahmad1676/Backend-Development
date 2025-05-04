const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS  // your email password or app password
    }
});

const sendWelcomeEmail = async (to, name) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Welcome to Our App!',
        html: `<h2>Welcome, ${name}!</h2>
                     <p>Thank you for registering. We're excited to have you on board.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent to', to);
    } catch (error) {
        console.error('Error sending welcome email:', error.message);
    }
};

module.exports = sendWelcomeEmail;