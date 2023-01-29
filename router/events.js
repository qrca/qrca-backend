const eventRouter = require("express").Router();
const Event = require("../models/event");
const Student = require("../models/student");

const moment = require("moment-timezone");

eventRouter.get("/", async (_req, res) => {
  const events = await Event.find({}).populate("studentLogs.student");
  res.json(events);
});

eventRouter.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "studentLogs.student"
  );
  res.json(event);
});

eventRouter.post("/", async (req, res) => {
  const body = req.body;
  const students = await Student.find({});
  const studentLogs = students.map((s) => {
    return {
      student: s._id,
      login1: null,
      login2: null,
      logout1: null,
      logout2: null,
    };
  });

  // const in1 = body.in1 !== null ? moment(body.in1).tz("Asia/Manila") : null;
  // const inEnd1 =
  //   body.inEnd1 !== null ? moment(body.inEnd1).tz("Asia/Manila") : null;
  // const in2 = body.in2 !== null ? moment(body.in2).tz("Asia/Manila") : null;
  // const inEnd2 =
  //   body.inEnd2 !== null ? moment(body.inEnd2).tz("Asia/Manila") : null;
  // const out1 = body.out1 !== null ? moment(body.out1).tz("Asia/Manila") : null;
  // const outEnd1 =
  //   body.outEnd1 !== null ? moment(body.outEnd1).tz("Asia/Manila") : null;
  // const out2 = body.out2 !== null ? moment(body.out2).tz("Asia/Manila") : null;
  // const outEnd2 =
  //   body.outEnd2 !== null ? moment(body.outEnd2).tz("Asia/Manila") : null;

  const in1 = body.in1;
  const inEnd1 = body.inEnd1;
  const in2 = body.in2;
  const inEnd2 = body.inEnd2;
  const out1 = body.out1;
  const out2 = body.out2;
  const outEnd2 = body.outEnd2;
  const outEnd1 = body.outEnd1;

  const newEvent = new Event({
    eventName: body.eventName,
    eventType: body.eventType,
    date: moment(body.date).tz("Asia/Manila"),
    in1,
    inEnd1,
    in2,
    inEnd2,
    out1,
    outEnd1,
    out2,
    outEnd2,
    studentLogs,
  });

  // console.log(newEvent);

  const savedEvent = await newEvent.save();
  // console.log(studentLogs);
  // res.status(200).json({ message: `hi` });
  res.status(200).json(savedEvent);
});

eventRouter.put("/:id", async (req, res) => {
  const eventId = req.params.id;
  const body = req.body;
  const login1 = body.login1;
  const studentUpdate = await Event.findOneAndUpdate(
    { _id: eventId, "studentLogs.student": body.studentId },
    { $set: { "studentLogs.$.login1": login1 } },
    { new: true }
  );

  //////////////// CHECK IF IN1, IN2, OUT1, OUT2

  // const studentFromDb = await Student.findById(body.studentId);

  // console.log(eventsFromDb);
  // const newStudentLog = {
  //   student: studentFromDb._id,
  //   logTime: moment(body.logTime).tz("Asia/Manila"),
  // };
  // eventsFromDb.studentLogs = eventsFromDb.studentLogs.concat(newStudentLog);
  // const savedLogs = await eventsFromDb.save();

  res.status(200).json(studentUpdate);
});

eventRouter.delete("/", async (req, res) => {
  await Event.deleteMany({});
  res.status(200).send("All events deleted.");
});

module.exports = eventRouter;
