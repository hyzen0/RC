const { json } = require("body-parser");
const { Router } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Person Model
const Person = require("../../models/auth.model");

//Load Profile Model
const Profile = require("../../models/Profile");

const {
  requireSignin,
  adminMiddleware,
} = require("../controllers/auth.controller");

//@type GET
//@route /api/profile/
//@desc route for personal user profile
//@access PRIVATE
router.get("/", requireSignin, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ profilenotfound: "No profile found" });
      }
      return res.json(profile);
    })
    .catch(err => console.log("ERROR" + err));
});

//@type POST
//@route /api/profile/
//@desc route for UPDATING/SAVING personal user profile
//@access PRIVATE
router.post("/", requireSignin, (req, res) => {
  const profileValues = {};
  profileValues.user = req.user.id;
  if (req.body.state) profileValues.state = req.body.state;
  if (req.body.contact) profileValues.contact = req.body.contact;

  //get social links
  profileValues.social = {};
  if (req.body.instagram) profileValues.social.instagram = req.body.instagram;
  if (req.body.facebook) profileValues.social.facebook = req.body.facebook;

  //DATABASE
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileValues },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => console.log("problem with update" + err));
      } else {
        Profile.findOne({ email: profileValues.email })
          .then(profile => {
            //Username already exist
            if (profile) {
              res.status(400).json({ email: "email already exist" });
            }
            //save user
            new Profile(profileValues)
              .save()
              .then(profile => res.json(profile))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log("Problem in fetching profile" + err));
});

//@type GET
//@route /api/profile/:username
//@desc route for getting user profile base on USERNAME
//@access PUBLIC
router.get("/:username", (req, res) => {
  Profile.findOne({ username: req.params.username })
    .populate("user", ["name", "profilepic"])
    .then(profile => {
      if (!profile) {
        res.status(404).json({ usernnotfound: "User not found" });
      }
      res.json(profile);
    })
    .catch(err => console.log("Error in fetching username" + err));
});

//@type GET
//@route /api/profile/find/everyone
//@desc route for getting user profile of everyone
//@access PUBLIC
router.get("/find/everyone", (req, res) => {
  Profile.find()
    .populate("user", ["name", "profilepic"])
    .then(profiles => {
      if (!profiles) {
        res.status(404).json({ usernnotfound: "User not found" });
      }
      res.json(profiles);
    })
    .catch(err => console.log("Error in fetching username" + err));
});

//@type DELETE
//@route /api/profile/
//@desc route for deleting user based on ID
//@access PRIVATE
router.delete("/", requireSignin, (req, res) => {
  Profile.findOne({ user: req.user.id });
  Profile.findByIdAndRemove({ user: req.user.id })
    .then(() => {
      Person.findByIdAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: "delete was a success" }))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
