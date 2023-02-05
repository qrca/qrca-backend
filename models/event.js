const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventType: String,
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
