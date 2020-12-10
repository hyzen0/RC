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

//Load Study Material Model
const study = require("../models/studymaterial");

//@type GET
//@route /api/study
//@desc route for showing all study material
//@access PUBLIC
router.get("/", (req, res) => {
  study
    .find()
    .sort({ date: "desc" })
    .then(blogs => res.json(blogs))
    .catch(err => res.json({ noBlog: " No Study material to display" + err }));
});

//@type GET
//@route /api/study/:id
//@desc route for single study material by id
//@access PUBLIC
router.get("/:id", (req, res) => {
  study
    .findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err =>
      res.status(404).json({ noblogfound: "No Study material found" })
    );
});

//@type POST
//@route /api/study/
//@desc route for submitting study material
//@access PRIVATE
router.post("/", upload.single("coverImg"), requireSignin, (req, res) => {
  const newStudy = new study({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
  });
  newStudy
    .save()
    .then(study =>
      res.json({
        msg: "Study material added successfully!",
        study,
      })
    )
    .catch(err =>
      console.log("Unable to push study material to database" + err)
    );
});

module.exports = router;
