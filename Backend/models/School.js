const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/694/444/png-clipart-computer-icons-school-escuela-school-angle-building.png",
  },
});

module.exports = School = mongoose.model("mySchool", SchoolSchema);
