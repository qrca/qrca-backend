/**
 * Student Schema
 * @param eventName: name of the event
 * @param hasNoFines: indicates whether fines are implemented on an event, boolean
 * @param date: Date of the event
 * @params in_$num: Starting time of the $numth login
 * @params inEnd_$num: End time of the $numth login
 *    @reason in1 and inEnd1 creates a range of the time for the event (7:00-9:00, where 7:00 is in1 and inEnd1 is 9:00)
 * @param studentLogs: An array containing the students that have logged.
 * @schema
 */

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  hasNoFines: Boolean,
  date: Date,
  in1: { type: Date, default: null },
  inEnd1: { type: Date, default: null },
  in2: { type: Date, default: null },
  inEnd2: { type: Date, default: null },
  out1: { type: Date, default: null },
  outEnd1: { type: Date, default: null },
  out2: { type: Date, default: null },
  outEnd2: { type: Date, default: null },
  studentLogs: [
    {
      student: {
        type: mongoose.Schema.Types.String,
        ref: "Student",
      },
      login1: { type: Date, default: null },
      login2: { type: Date, default: null },
      logout1: { type: Date, default: null },
      logout2: { type: Date, default: null },
      isExcused: { type: Boolean, default: false },
      scanIn1: {
        type: String,
        default: null,
      },
      scanIn2: {
        type: String,
        default: null,
      },
      scanOut1: {
        type: String,
        default: null,
      },
      scanOut2: {
        type: String,
        default: null,
      },
    },
  ],
});

eventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

module.exports = mongoose.model("Event", eventSchema);
