const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myPerson",
  },
});

module.exports = Profile = mongoose.model("myProfile", ProfileSchema);
