const express = require("express");
const router = express.Router();

//Load School Model
const School = require("../models/School");

const {
  requireSignin,
  adminMiddleware,
} = require("../controllers/auth.controller");

//@type GET
//@route /api/schools
//@desc route for showing all schools
//@access PUBLIC
router.get("/", (req, res) => {
  School.find()
    .then(schools => res.json(schools))
    .catch(err => res.json({ noSchool: "no schools to display" }));
});

//@type POST
//@route /api/schools
//@desc route posting schools
//@access PRIVATE

router.post("/", requireSignin, (req, res) => {
  const newSchool = new School({
    school_name: req.body.school_name,
    pincode: req.body.pincode,
    address: req.body.address,
    website: req.body.website,
    mail_id: req.body.mail_id,
    contact_no: req.body.contact_no,
    board: req.body.board,
  });
  newSchool
    .save()
    .then(school => res.json(school))
    .catch(err => console.log("Unable to push school to database" + err));
});

module.exports = router;
