const expressAsyncHandler = require("express-async-handler");
const Enquiry = require("../model/enquiryModel");
const generateExcelFile = require("../utils/generateExcelFile");
const sendEmail = require("../utils/sendEmail");
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const adminEmail = process.env.EMAIL_USER;

const saveEnquiry = expressAsyncHandler(async (req, res) => {
    const { name, enquiry, subject, message, email } = req.body;

    // Validation
    if (!name || !email || !subject || !message || !enquiry) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    try {
        // Save the enquiry in the database
        const newEnquiry = new Enquiry({ name, enquiry, subject, message, email });
        await newEnquiry.save();

        // Generate the Excel file
        const contactData = { Name: name, Enquiry: enquiry, Subject: subject, Message: message, Email: email };
        const filePath = await generateExcelFile(contactData);

        console.log('Generated file path:', filePath);

        // Ensure the file exists before attempting to send it
        if (!fs.existsSync(filePath)) {
            console.error('File does not exist:', filePath);
            res.status(500);
            throw new Error("Error generating the Excel file.");
        }

        // Define the email template (if needed)
        const emailTemplate = `
          <p>You have a new contact form submission:</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Enquiry:</strong> ${enquiry}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `;

        // Send the email with the Excel attachment
        await sendEmail(
            subject,
            adminEmail,
            emailTemplate,
            'no-reply@tebtechnologyltd.com',
            null,
            [
                {
                    filename: 'contact_form_submission.xlsx',
                    path: filePath,
                },
            ]
        );

        console.log('Email sent.');

        res.status(200).json("Enquiry saved and email sent");
    } catch (error) {
        console.error('Error saving enquiry:', error);
        res.status(500);
        throw new Error("Error saving the enquiry.");
    }
});

module.exports = {
    saveEnquiry,
};
