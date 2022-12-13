const eventRouter = require("express").Router();
const Event = require("../models/event");

eventRouter.get("/", async (_req, res) => {
  const events = await Event.find({});
  res.json(events);
});

eventRouter.post("/", async (req, res) => {
  const body = req.body;
  const newEvent = new Event({
    eventName: body.eventName,
    date: new Date(body.date),
    startTime: new Date(body.startTime),
    endTime: new Date(body.endTime),
  });

  const savedEvent = await newEvent.save();

  res.status(200).json(savedEvent);
});

module.exports = eventRouter;
