const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

// Generate or update the Excel file
const generateExcelFile = async (contactData) => {
  const directory = path.resolve(__dirname);
  const filePath = path.join(directory, "contact_form_submission.xlsx");

  try {
    // Ensure the directory exists
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const workbook = new ExcelJS.Workbook();
    let worksheet;

    // Check if the file already exists
    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath);
      worksheet = workbook.getWorksheet("Contact Form Submission");
    }

    // Create worksheet if it doesn't exist
    if (!worksheet) {
      worksheet = workbook.addWorksheet("Contact Form Submission");
      worksheet.columns = [
        { header: "Name", key: "name", width: 30 },
        { header: "Enquiry", key: "enquiry", width: 50 },
        { header: "Subject", key: "subject", width: 30 },
        { header: "Message", key: "message", width: 50 },
        { header: "Email", key: "email", width: 30 },
      ];
    }

    // Log existing rows before adding new data

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      //   console.log(`Row ${rowNumber}: ${row.values}`);
    });

    // Add new row explicitly

    const newRow = worksheet.addRow([]);
    newRow.getCell(1).value = contactData.Name;
    newRow.getCell(2).value = contactData.Enquiry;
    newRow.getCell(3).value = contactData.Subject;
    newRow.getCell(4).value = contactData.Message;
    newRow.getCell(5).value = contactData.Email;

    // Log rows after adding new data

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      //   console.log(`Row ${rowNumber}: ${row.values}`);
    });

    // Write to file

    await workbook.xlsx.writeFile(filePath);
  } catch (error) {
    console.error("Error writing file:", error);
  }

  return filePath;
};

module.exports = generateExcelFile;
