const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Person Model
const Person = require("../../models/Person");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load Blog Model
const Blog = require("../../models/Blog");
const { route } = require("./auth");

//@type GET
//@route /api/blogs
//@desc route for showing all blogs
//@access PUBLIC
router.get("/", (req, res) => {
  Blog.find()
    .sort({ date: "desc" })
    .then((blogs) => res.json(blogs))
    .catch((err) => res.json({ noBlog: " No blogs to display" + err }));
});

//@type GET
//@route /api/blogs/:id
//@desc route for single blog by id
//@access PUBLIC
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => res.status(404).json({ noblogfound: "No Blog found" }));
});

//@type POST
//@route /api/blogs/
//@desc route for submitting blogs
//@access PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newBlog = new Blog({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      coverimg: req.body.coverimg,
    });
    newBlog
      .save()
      .then((blog) =>
        res.json({
          msg: "Blog added successfully!",
          blog,
        })
      )
      .catch((err) => console.log("Unable to push blog to database" + err));
  }
);

//@type POST
//@route /api/blogs/comments/:id
//@desc route for comments
//@access PRIVATE

router.post(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Blog.findById(req.params.id)
      .then((blog) => {
        const newComment = {
          user: req.user.id,
          name: req.body.name,
          text: req.body.text,
        };
        blog.comments
          .unshift(newComment)
          .save()
          .then((blog) => res.json(blog))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

//@type POST
//@route /api/blogs/likes/:id
//@desc route for likes
//@access PRIVATE
router.post(
  "/likes/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Blog.findById(req.params.id)
          .then((blog) => {
            if (
              blog.likes.filter(
                (likes) => likes.user.toString() === req.user.id.toString()
              ).length > 0
            ) {
              return blog.likes
                .pop({ user: req.user.id })
                .save()
                .then((blog) => res.json(blog))
                .catch((err) => console.log(err));
            }

            blog.likes.unshift({ user: req.user.id });
            blog
              .save()
              .then((blog) => res.json(blog))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
