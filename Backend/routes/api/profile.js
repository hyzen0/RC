const { json } = require("body-parser");
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
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id });
    Profile.findByIdAndRemove({ user: req.user.id })
      .then(() => {
        Person.findByIdAndRemove({ _id: req.user.id })
          .then(() => res.json({ success: "delete was a success" }))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

//@type POST
//@route /api/profile/parent
//@desc route for adding parent's information
//@access PRIVATE

router.post(
  "/parent",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          res.status(404).json({ usernnotfound: "user not found" });
        }
        const newParent = {
          relation: req.body.relation,
          state: req.body.state,
        };
        profile.parent.unshiftt(newParent);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

//@type DELETE
//@route /api/profile/parent/:p_id
//@desc route for deletingparent's information
//@access PRIVATE

router.delete(
  "/parent/:p_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        res.status(404).json({ notfound: "not found" });
      }
      const removethis = profile.parent
        .map(item => item.id)
        .indexOf(req.params.p_id);

      profile.parent.splice(removethis, 1);

      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => console.log(err));
    });
  }
);

module.exports = router;
