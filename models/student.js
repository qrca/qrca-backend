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
