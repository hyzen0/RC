const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myPerson",
  },
  username: {
    type: String,
    required: true,
  },
  parent: [
    {
      relation: {
        type: String,
      },
      state: {
        type: String,
      },
    },
  ],
});

module.exports = Profile = mongoose.model("myProfile", ProfileSchema);
