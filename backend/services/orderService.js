const xlsx = require("xlsx");
const path = require("path");

const filePath = path.join(__dirname, "../data/Analysis.xlsx");

// Normalize keys for all rows in a sheet
function normalizeSheet(rows) {
  return rows.map((row) => {
    const normalized = {};
    for (const key in row) {
      if (Object.hasOwn(row, key)) {
        normalized[key.trim().toUpperCase()] = row[key];
      }
    }
    return normalized;
  });
}

// Load all sheets from Excel file
function loadAllSheets() {
  const workbook = xlsx.readFile(filePath);
  const sheets = {};

  workbook.SheetNames.forEach((sheet) => {
    const name = sheet.trim().toUpperCase();
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
    sheets[name] = normalizeSheet(data);
  });

  return sheets;
}

// Match error code in error sheets
function matchErrorCode(code, errorMaps) {
  const normalizedCode = (code || "").trim().toUpperCase();

  for (const [stage, records] of Object.entries(errorMaps)) {
    if (Array.isArray(records)) {
      const matches = records.filter(
        (row) =>
          (row["ERROR CODE"] || "").trim().toUpperCase() === normalizedCode
      );
      if (matches.length > 0) {
        return {
          error_status: true,
          stage,
          data: {
            "ERROR DESCRIPTION": matches[0]["ERROR DESCRIPTION"] || "",
            RESOLUTIONS: matches
              .map((r) => r["RESOLUTIONS"])
              .filter(Boolean)
              .join(" | "),
            "RESPONSIBLE SYSTEMS": matches[0]["RESPONSIBLE SYSTEMS"] || "",
          },
        };
      }
    }
  }
  return { error_status: false, stage: "", data: {} };
}

// Generate enriched order data from Excel
function getOrderDetails() {
  const sheets = loadAllSheets();
  const availableSheets = Object.keys(sheets);

  const orders = sheets["ORDERDETAILS"];
  const pocsSheet = sheets["SYSTEMS POCS"];

  if (!orders || !pocsSheet) {
    throw new Error(
      "Missing required sheets: 'OrderDetails' or 'SYSTEMS POCs'"
    );
  }

  const pocsMap = Object.fromEntries(
    pocsSheet.map((row) => [row["SYSTEM"], row["POC"]])
  );

  const errorMaps = {
    "Circuit and Order Creation": sheets["CIRCUITANDORDERCREATION"] || [],
    "Auto Design": sheets["AUTODESIGN"] || [],
    "Network Links": sheets["DETERMINENETWROKLINKS"] || [],
    "Parser Generation": sheets["PREACTIVATION_BNC"] || [],
    "Line Test": sheets["LINE TEST"] || [],
    Activation: sheets["ACTIVATION_BNC"] || [],
    "Order Completion": sheets["ORDERCOMPLETION"] || [],
  };

  return orders.map((order) => {
    const code = order["ERROR CODE"];
    const match = matchErrorCode(code, errorMaps);
    const responsibleSystem = match.data["RESPONSIBLE SYSTEMS"];
    return {
      orderNumber: order["ORDER NUMBER"],
      status: order["STATUS"],
      ErrorCode: code,
      startDate: order["START DATE"] || "",
      endDate: order["END DATE"] || "",
      stage: match.stage || "",
      ErrorDescription: match.data["ERROR DESCRIPTION"] || "",
      Resolutions: match.data["RESOLUTIONS"] || "",
      ResponsibleSystems: responsibleSystem || "",
      POC: pocsMap[responsibleSystem] || "",
    };
  });
}

// Compose email format text
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

module.exports = {
  getOrderDetails,
  getEmailFormat,
};
