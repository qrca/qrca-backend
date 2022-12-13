const studentRouter = require("express").Router();
const Student = require("../models/student");

studentRouter.get("/", async (_req, res) => {
  const students = await Student.find({});
  res.json(students);
});

studentRouter.post("/", async (req, res) => {
  const body = req.body;
  const newStudent = new Student({
    _id: body.idNumber,
    name: body.name,
    address: body.address,
  });

  const savedStudent = await newStudent.save();
  res.status(200).json(savedStudent);
});

module.exports = studentRouter;
