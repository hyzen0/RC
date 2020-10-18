const { Router } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Person Model
const Person = require("../../models/Person");

//Load Profile Model
const Profile = require("../../models/Profile");

//@type GET
//@route /api/profile/
//@desc route for personal user profile
//@access PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json({ profilenotfound: "No profile found" });
        }
        return res.json(profile);
      })
      .catch(err => console.log("ERROR" + err));
  }
);

//@type POST
//@route /api/profile/
//@desc route for UPDATING/SAVING personal user profile
//@access PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileValues = {};
    profileValues.user = req.user.id;
    if (req.body.username) profileValues.username = req.body.username;

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
          Profile.findOne({ username: profileValues.username })
            .then(profile => {
              //Username already exist
              if (profile) {
                res.status(400).json({ username: "username already exist" });
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
  }
);

module.exports = router;
