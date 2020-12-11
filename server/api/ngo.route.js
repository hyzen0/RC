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

//Load ngo Model
const ngo = require("../models/NGO");

//@type GET
//@route /api/blogs
//@desc route for showing all blogs
//@access PUBLIC
router.get("/", (req, res) => {
  ngo
    .find()
    .sort({ date: "desc" })
    .then(ngos => res.json(ngos))
    .catch(err => res.json({ noNgos: " No Nogs to display" + err }));
});

//@type GET
//@route /api/blogs/:id
//@desc route for single blog by id
//@access PUBLIC
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(ngo => res.json(ngo))
    .catch(err => res.status(404).json({ noblogfound: "No Ngo found" }));
});

//@type POST
//@route /api/blogs/
//@desc route for submitting blogs
//@access PRIVATE
router.post(
  "/",
  upload.single("coverImg"),
  requireSignin,
  adminMiddleware,
  (req, res) => {
    const newNgo = new ngo({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
    });
    newNgo
      .save()
      .then(ngo =>
        res.json({
          msg: "Ngo added successfully!",
          ngo,
        })
      )
      .catch(err => console.log("Unable to push ngo to database" + err));
  }
);

module.exports = router;
