const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  idNumber: String,
  name: String,
  address: String,
});

studentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

module.exports = mongoose.model("Student", studentSchema);
