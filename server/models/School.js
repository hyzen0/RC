const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  school_name: {
    type: String,
  },
  pincode: {
    type: Number,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  website: {
    type: String,
    default: null,
  },
  mail_id: {
    type: String,
    default: null,
  },
  contact_no: {
    type: String,
    default: null,
  },
  board: {
    type: String,
    default: null,
  },
  city: {
    type: String,
  },
});

module.exports = School = mongoose.model("mySchool", SchoolSchema);
