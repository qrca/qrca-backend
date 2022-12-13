const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventType: String,
  date: Date,
  startTime: Date,
  endTime: Date,
  studentLogs: [
    {
      student: {
        type: mongoose.Schema.Types.String,
        ref: "Student",
      },
      logTime: Date,
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
