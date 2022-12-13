const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  date: Date,
  startTime: Date,
  endTime: Date,
});

eventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

module.exports = mongoose.model("Event", eventSchema);
