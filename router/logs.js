const logRouter = require("express").Router();
const Log = require("../models/log");

logRouter.get("/", async (_req, res) => {
  const logs = await Log.find({});
  res.json(logs);
});

// eventRouter.post("/", async (req, res) => {
//   const body = req.body;
//   const newEvent = new Log({
//     eventName: body.eventName,
//     date: new Date(body.date),
//     startTime: new Date(body.startTime),
//     endTime: new Date(body.endTime),
//   });

//   const savedEvent = await newEvent.save();

//   res.status(200).json(savedEvent);
// });

module.exports = logRouter;
