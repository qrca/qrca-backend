const studentRouter = require("express").Router();
const Student = require("../models/student");
const Event = require("../models/event");

studentRouter.get("/", async (_req, res) => {
  const students = await Student.find({});
  res.json(students);
});

studentRouter.get("/officers", async (req, res) => {
  const officers = await Student.find({ isOfficer: true });
  res.json(officers);
});

studentRouter.get("/fines/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  // check fines per hour of late
  const studentAttendance = await Event.find({
    "studentLogs.student": student._id,
  })
    .lean()
    .populate("studentLogs.student");
  res.status(200).json({ hi: "hi" });

  // check number of absences:
  // get unique days, check number of unique days student attended, subtract and multiply by amount (check if officer)
});

studentRouter.post("/", async (req, res) => {
  const body = req.body;
  const newStudent = new Student({
    _id: body.idNumber,
    name: body.name,
    address: body.address,
    isOfficer: false,
  });

  const savedStudent = await newStudent.save();
  res.status(200).json(savedStudent);
});

studentRouter.put("/:id", async (req, res) => {
  const studentId = req.params.id;
  const officer = await Student.findByIdAndUpdate(
    studentId,
    {
      isOfficer: true,
    },
    { new: true }
  );
  res.status(200).json(officer);
});

module.exports = studentRouter;
