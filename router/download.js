const downloadRouter = require("express").Router();
const Event = require("../models/event");
const logger = require("../utils/logger");
const ExcelJS = require("exceljs");
const calculateFines = require("../utils/utils");

downloadRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id).populate("studentLogs.student");

  if (event === null) {
    const err = `Event with ID ${id} is not found.`;
    logger.error(err);
    res.status(404).json({ error: err });
  }

  logger.debug("Calculating fines.");
  const students = calculateFines(event);

  logger.debug("Creating a new workbook.");
  // Create a new workbook
  const workbook = new ExcelJS.Workbook();
  // Add a new worksheet to the workbook
  const worksheet = workbook.addWorksheet("Attendance");

  // Merge cells for the first row
  worksheet.mergeCells("A1:G1");

  // Set the value and styling for the first row
  const firstRow = worksheet.getRow(1);
  const cell = firstRow.getCell(1);
  cell.value = "Association of Computer Scientists\nATTENDANCE\nEvent";
  cell.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  cell.font = {
    bold: true,
  };
  firstRow.height = 70;

  // Add the header row
  const headerRow = worksheet.addRow([
    "Student number",
    "Name",
    "Morning login",
    "Morning logout",
    "Afternoon login",
    "Afternoon logout",
    "Fines",
  ]);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });

  // Adjust column widths to fit content
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnWidth = cell.value ? cell.value.toString().length : 0;
      if (columnWidth > maxLength) {
        maxLength = columnWidth;
      }
    });
    column.width = maxLength - 20;
  });

  students.forEach((s) => {
    const row = [
      s.studentNumber,
      s.name,
      s.morningLogin,
      s.morningLogout,
      s.afternoonLogin,
      s.afternoonLogout,
      s.fine,
    ];
    // console.log(row);
    const studentRow = worksheet.addRow(row);
    studentRow.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });
  });

  // Save the workbook
  workbook.xlsx.writeFile(`./backups/${id}.xlsx`).then(function () {
    logger.info(`Attendance on event with id ${id} is created.`);
    res.download(`./backups/${id}.xlsx`);
  });

  // res.status(200).json({ message: "noice" });
});

module.exports = downloadRouter;
