const eventRouter = require("express").Router();
const Event = require("../models/event");
const Student = require("../models/student");

eventRouter.get("/", async (_req, res) => {
  const events = await Event.find({}).populate();
  res.json(events);
});

eventRouter.post("/", async (req, res) => {
  const body = req.body;
  const newEvent = new Event({
    eventName: body.eventName,
    eventType: body.eventType,
    date: new Date(body.date),
    startTime: new Date(body.startTime),
    endTime: new Date(body.endTime),
    studentLogs: [],
  });

  const savedEvent = await newEvent.save();

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
    logTime: new Date(body.logTime),
  };
  eventsFromDb.studentLogs = eventsFromDb.studentLogs.concat(newStudentLog);
  const savedLogs = await eventsFromDb.save();

  res.status(200).json(savedLogs);
});

module.exports = eventRouter;
