const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  profilepic: {
    type: String,
    default:
      "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
  },
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
