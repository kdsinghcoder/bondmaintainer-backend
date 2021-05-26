const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
//TO del file after uploading a new one
const fs = require("fs");

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../../config/auth");
var Con = require("../../models/Connection");
var User = require("../../models/User");
var Rem = require("../../models/Reminders");
const { request } = require("http");

//MULTER

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/plugins/images/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
}).single("ProfilePic");

// Dashboard

mongoose.set("useFindAndModify", false);

router.get("/", ensureAuthenticated, (req, res) => {
  Con.count({ UserID: req.user._id }, function (err, Totalcon) {
    if (err) {
      console.log(err);
    } else {
      Rem.count({ UserID: req.user._id }, function (err, TotalRem) {
        if (err) {
          console.log(err);
        } else {
          User.findOneAndUpdate(
            { _id: req.user._id },
            { $inc: { PageView: 1 } },
            { new: true },
            function (err, response) {
              if (err) {
                console.log(err);
              } else {
                User.findOne(
                  { _id: req.user._id },
                  function (err, userPageView) {
                    if (err) {
                      console.log(err);
                    } else {
                      Rem.find(
                        { UserID: req.user._id },
                        null,
                        { sort: { Date: -1 }, limit: 5 },
                        (err, Reminders) => {
                          if (err) {
                            console.log(err);
                          } else {
                            Con.find(
                              { UserID: req.user._id },
                              null,
                              { limit: 5 },
                              (err, FavConnections) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  res.render("dashboard/dashboard", {
                                    user: req.user,
                                    Totalcon: Totalcon,
                                    TotalRem: TotalRem,
                                    PageView: userPageView.PageView,
                                    Reminders: Reminders,
                                    FavConnections: FavConnections,
                                  });
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  });
});

router.get("/profile", ensureAuthenticated, (req, res) =>
  res.render("dashboard/profile", { user: req.user })
);

router.post("/updateprofile", ensureAuthenticated, (req, res) => {
  var _id = req.user.id;
  var newname = req.body.name;
  var newphonenumber = req.body.phonenumber;
  User.findByIdAndUpdate(
    _id,
    { name: newname, phonenumber: newphonenumber },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/dashboard/profile");
      }
    }
  );
});

router.post("/updateprofilepic", ensureAuthenticated, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      request.redirect("/dashboard/profile");
    } else {
      var path = "/plugins/images/" + req.file.filename;
      // Delete the Previous file
      var previouspath = "./public" + req.user.ProfilePic;
      //  console.log("previous path is : "+previouspath);
      fs.unlink(previouspath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Prevoius file deleated");
        }
      });
      User.findByIdAndUpdate(
        req.user.id,
        { ProfilePic: path },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/dashboard/profile");
          }
        }
      );
    }
  });
});

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
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      var user = req.user.id;
      var Name = req.body.Name;
      var PhoneNumber = req.body.PhoneNumber;
      var ProfilePic = "/plugins/images/" + req.file.filename;
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
    }
  });
});

router.get("/viewconnection", ensureAuthenticated, (req, res) => {
  Rem.find({ ConnectionID: req.query.viewrem_user }, function (err, allRem) {
    if (err) {
      console.log(err);
    } else {
      Con.findOne({ _id: req.query.viewrem_user }, function (err, connection) {
        if (err) {
          console.log(err);
        } else {
          res.render("dashboard/viewconnection", {
            user: req.user,
            connection: connection,
            allRem: allRem,
          });
        }
      });
    }
  });
});

router.post("/viewconnection", ensureAuthenticated, (req, res) => {
  var UserID = req.user.id;
  var ConnectionID = req.body.ConnectionID;
  var Title = req.body.Title;
  var Message = req.body.Message;
  var Date = req.body.Date;
  var Frequency = req.body.Frequency;
  var newRem = {
    UserID: UserID,
    Title: Title,
    ConnectionID: ConnectionID,
    Title: Title,
    Message: Message,
    Date: Date,
    Frequency: Frequency,
  };
  Rem.create(newRem, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      var url = "/dashboard/viewconnection?viewrem_user=" + ConnectionID;
      res.redirect(url);
    }
  });
});

router.get("/tips", ensureAuthenticated, (req, res) =>
  res.render("dashboard/tips", {
    user: req.user,
  })
);

module.exports = router;
