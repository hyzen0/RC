const express = require("express");
const router = express.Router();
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const {
  requireSignin,
  adminMiddleware,
} = require("../controllers/auth.controller");
const DIR = "./public/";

const storage = new GridFsStorage({ url: process.env.MONGO_URI });

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//Load Profile Model
const Profile = require("../models/Profile");

//Load Blog Model
const Blog = require("../models/Blog");

//@type GET
//@route /api/blogs
//@desc route for showing all blogs
//@access PUBLIC
router.get("/", (req, res) => {
  Blog.find()
    .sort({ date: "desc" })
    .then(blogs => res.json(blogs))
    .catch(err => res.json({ noBlog: " No blogs to display" + err }));
});

//@type GET
//@route /api/blogs/:id
//@desc route for single blog by id
//@access PUBLIC
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(404).json({ noblogfound: "No Blog found" }));
});

//@type POST
//@route /api/blogs/
//@desc route for submitting blogs
//@access PRIVATE
router.post("/", upload.single("coverImg"), requireSignin, (req, res) => {
  const newBlog = new Blog({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
  });
  newBlog
    .save()
    .then(blog =>
      res.json({
        msg: "Blog added successfully!",
        blog,
      })
    )
    .catch(err => console.log("Unable to push blog to database" + err));
});

//@type POST
//@route /api/blogs/comments/:id
//@desc route for comments
//@access PRIVATE

router.post("/comments/:id", requireSignin, (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      const newComment = {
        user: req.user.id,
        name: req.body.name,
        text: req.body.text,
      };
      blog.comments
        .unshift(newComment)
        .save()
        .then(blog => res.json(blog))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//@type POST
//@route /api/blogs/likes/:id
//@desc route for likes
//@access PRIVATE
router.post("/likes/:id", requireSignin, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Blog.findById(req.params.id)
        .then(blog => {
          if (
            blog.likes.filter(
              likes => likes.user.toString() === req.user.id.toString()
            ).length > 0
          ) {
            return blog.likes
              .pop({ user: req.user.id })
              .save()
              .then(blog => res.json(blog))
              .catch(err => console.log(err));
          }

          blog.likes.unshift({ user: req.user.id });
          blog
            .save()
            .then(blog => res.json(blog))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
