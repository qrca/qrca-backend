const eventRouter = require("express").Router();
const Event = require("../models/event");
const Student = require("../models/student");

const moment = require("moment-timezone");

eventRouter.get("/", async (_req, res) => {
  const events = await Event.find({}).populate("studentLogs.student");
  res.json(events);
});

eventRouter.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "studentLogs.student"
    );
    res.json(event);
  } catch (error) {
    logger.warn(error);
  }
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
    hasNoFines: body.hasNoFines,
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

  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error._message });
  }
});

eventRouter.put("/:id", async (req, res) => {
  const eventId = req.params.id;
  const body = req.body;

  // ####################### test feature #########################
  const events = await Event.findById(eventId);
  const student = events.studentLogs.filter(
    (s) => s.student === body.studentId
  );
  let studentUpdate;

  if (
    body.login1 !== null &&
    body.login1 !== undefined &&
    student[0].login1 === null
  ) {
    studentUpdate = await Event.findOneAndUpdate(
      { _id: eventId, "studentLogs.student": body.studentId },
      { $set: { "studentLogs.$.login1": body.login1 } },
      { new: true }
    );
  } else if (
    body.login2 !== null &&
    body.login2 !== undefined &&
    student[0].login2 === null
  ) {
    studentUpdate = await Event.findOneAndUpdate(
      { _id: eventId, "studentLogs.student": body.studentId },
      { $set: { "studentLogs.$.login2": body.login2 } },
      { new: true }
    );
  } else if (
    body.logout1 !== null &&
    body.logout1 !== undefined &&
    student[0].logout1 === null
  ) {
    studentUpdate = await Event.findOneAndUpdate(
      { _id: eventId, "studentLogs.student": body.studentId },
      { $set: { "studentLogs.$.logout1": body.logout1 } },
      { new: true }
    );
  } else if (
    body.logout2 !== null &&
    body.logout2 !== undefined &&
    student[0].logout2 === null
  ) {
    studentUpdate = await Event.findOneAndUpdate(
      { _id: eventId, "studentLogs.student": body.studentId },
      { $set: { "studentLogs.$.logout2": body.logout2 } },
      { new: true }
    );
  }

  res.status(200).json(studentUpdate);
});

eventRouter.delete("/ajdsfjadsiadsfiuasudifh", async (req, res) => {
  await Event.deleteMany({});
  res.status(200).send("All events deleted.");
});

module.exports = eventRouter;
