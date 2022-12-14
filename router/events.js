const eventRouter = require("express").Router();
const Event = require("../models/event");
const Student = require("../models/student");

const moment = require("moment-timezone");

eventRouter.get("/", async (_req, res) => {
  const events = await Event.find({}).populate("studentLogs.student");
  res.json(events);
});

eventRouter.post("/", async (req, res) => {
  const body = req.body;
  const newEvent = new Event({
    eventName: body.eventName,
    eventType: body.eventType,
    date: moment(body.date).tz("Asia/Manila"),
    startTime: moment(body.startTime).tz("Asia/Manila"),
    endTime: moment(body.endTime).tz("Asia/Manila"),
    studentLogs: [],
  });

  const savedEvent = await newEvent.save();
  // console.log(newEvent);
  // res.status(200);
  res.status(200).json(savedEvent);
});

eventRouter.put("/:id", async (req, res) => {
  const eventId = req.params.id;
  const body = req.body;
  const eventsFromDb = await Event.findById(eventId);
  const studentFromDb = await Student.findById(body.studentId);

  console.log(eventsFromDb);
  const newStudentLog = {
    student: studentFromDb._id,
    logTime: moment(body.logTime).tz("Asia/Manila"),
  };
  eventsFromDb.studentLogs = eventsFromDb.studentLogs.concat(newStudentLog);
  const savedLogs = await eventsFromDb.save();

  res.status(200).json(savedLogs);
});

module.exports = eventRouter;
