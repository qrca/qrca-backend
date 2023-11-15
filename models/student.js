/**
 * Student Schema
 * @param _id: unique ID set by mongoose
 * @param name: name of the student
 * @param address
 * @param isOfficer: a boolean indicating whether a student is an officer or not
 * @schema
 */

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  _id: String,
  name: String,
  address: String,
  isOfficer: Boolean,
});

studentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
  },
});

module.exports = mongoose.model("Student", studentSchema);
