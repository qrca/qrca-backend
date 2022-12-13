const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  idNumber: String,
  name: String,
  address: String,
});

logSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

module.exports = mongoose.model("Student", logSchema);
