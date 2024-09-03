const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendEmail = async (subject, send_to, htmlTemplate, send_from, cc = null, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // If the template is an object, assume it's a Mailgen template
  let emailTemplate;
  if (typeof htmlTemplate === 'object') {
    const Mailgen = require('mailgen');
    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        name: 'tebtechnologyltd',
        link: 'http://localhost:3000',
      },
    });
    emailTemplate = mailGenerator.generate(htmlTemplate);
  } else if (typeof htmlTemplate === 'string' && htmlTemplate.endsWith('.html')) {
    // If the template is a string ending in .html, read the HTML file
    const templatePath = path.join(__dirname, htmlTemplate);
    emailTemplate = fs.readFileSync(templatePath, 'utf8');
  } else {
    // Assume it's a plain HTML string
    emailTemplate = htmlTemplate;
  }

  const options = {
    from: send_from,
    to: send_to,
    subject,
    html: emailTemplate,
    cc,
    attachments,
  };



  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Message sent: %s', info.messageId);
    }
  });
};

module.exports = sendEmail;
