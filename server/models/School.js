const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  school_name: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  address: {
    type: String,
  },
  website: {
    type: String,
  },
  mail_id: {
    type: String,
  },
  contact_no: {
    type: Number,
  },
  board: {
    type: String,
  },
});

module.exports = School = mongoose.model("mySchool", SchoolSchema);
