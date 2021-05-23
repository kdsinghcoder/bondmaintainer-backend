const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../../config/auth");
var Con = require("../../models/Connection");
var User = require("../../models/User");
var Rem = require("../../models/Reminders");
// Dashboard
router.get("/", ensureAuthenticated, (req, res) =>
  res.render("dashboard/dashboard", {
    user: req.user,
  })
);
router.get("/profile", ensureAuthenticated, (req, res) =>
  res.render("dashboard/profile", {
    user: req.user,
  })
);

router.get("/connections", ensureAuthenticated, (req, res) => {
  Con.find({ UserID: req.user.id }, function (err, allCon) {
    if (err) {
      console.log(err);
    } else {
      res.render("dashboard/connections", { user: req.user, allCon: allCon });
    }
  });
});

router.get("/notes", ensureAuthenticated, (req, res) =>
  res.render("dashboard/notes", {
    user: req.user,
  })
);

router.post("/notes", ensureAuthenticated, (req, res) => {
  _id = req.user.id;
  Notes = req.body.Notes;
  User.findByIdAndUpdate(_id, { Notes: Notes }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/dashboard/notes");
    }
  });
});

router.get("/addconnections", ensureAuthenticated, (req, res) =>
  res.render("dashboard/addconnections", {
    user: req.user,
  })
);

router.post("/addconnections", ensureAuthenticated, (req, res) => {
  var user = req.user.id;
  var Name = req.body.Name;
  var PhoneNumber = req.body.PhoneNumber;
  var ProfilePic = "../../public/img/mike.jpg";
  var newCon = {
    UserID: user,
    Name: Name,
    PhoneNumber: PhoneNumber,
    ProfilePic: ProfilePic,
  };
  Con.create(newCon, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/dashboard/addconnections");
    }
  });
});

router.get("/viewconnection", ensureAuthenticated, (req, res) =>{

  console.log(req.query.viewrem_user);
  Rem.find({ ConnectionID: req.query.viewrem_user }, function (err, allRem) {
    if (err) {
      console.log(err);
    } else {
      Con.findOne({ _id: req.query.viewrem_user }, function (err, connection) {
        if (err) {
          console.log(err);
        } else {
          console.log(connection);
          res.render("dashboard/viewconnection", { user: req.user, connection: connection, allRem: allRem });
        }
      });
    }
  });
}
);

router.get("/tips", ensureAuthenticated, (req, res) =>
  res.render("dashboard/tips", {
    user: req.user,
  })
);

module.exports = router;
