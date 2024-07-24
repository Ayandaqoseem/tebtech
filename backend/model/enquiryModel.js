const mongoose = require("mongoose");


const enquirySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"]
        },
        email: {
            type: String,
            required: [true, "Please add email"],
            // unique: true,
            trim: true,
            match: [
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Please enter a valid email",
            ],
        },
        message: {
            type: String,
            required: [true, "Please add message"]
        },
        enquiry: {
            type: String,
            required: [true, "Please add enquiry"]
        },
        subject: {
            type: String,
            required: [true, "Please add subject"]
        },
    },
    {
        timestamps: true
    }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);
module.exports = Enquiry; 