const express = require('express');
const cors = require('cors');
const path = require("path");
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));



// Contact form handler
app.post('/api/contact', async (req, res) => {
  const { name, email, contact, service } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.EMAIL_USER ,
      pass:process.env.EMAIL_PASS ,  // App password
    },
  });

  const mailOptions = {
    from: email,
    to:process.env.EMAIL_USER,
    subject: 'New Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Contact: ${contact}
      Service Needed: ${service}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).send({ success: false, message: 'Failed to send message' });
  }
});




app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
