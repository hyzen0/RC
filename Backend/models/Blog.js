const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myPerson",
  },
  textone: {
    type: String,
    required: true,
  },
  texttwo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: date,
    default: Date.now,
  },
});

module.exports = Blog = mongoose.model("myBlog", BlogSchema);
