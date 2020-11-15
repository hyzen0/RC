const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverimg: {
    type: String,
    required: true,
  },
  likes: [{ type: ObjectId, ref: "myPerson" }],
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      postedBy: {
        type: ObjectId,
        ref: "myPerson",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Blog = mongoose.model("myBlog", BlogSchema);
