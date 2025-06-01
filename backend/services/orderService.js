const xlsx = require("xlsx");
const path = require("path");

const filePath = path.join(__dirname, "../data/Analysis.xlsx");

function getEmailFormat({
  order_number,
  status,
  error_code,
  error_description,
  resolutions,
  responsible_system,
  poc,
}) {
  return `
Hi,
Please find the Fall out order details below:
Order Number: ${order_number}
Status: ${status}
Error Code: ${error_code}
Error Description: ${error_description}
Resolution: ${resolutions}
Responsible Systems: ${responsible_system}
POC: ${poc}`;
}

function getOrderDetails() {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets["OrderDetails"];
  const data = xlsx.utils.sheet_to_json(sheet);
  return data;
}

module.exports = {
  getOrderDetails,
  getEmailFormat,
};
