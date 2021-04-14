const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');

// Welcome Page
// router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/', ensureAuthenticated, (req, res) =>
  res.render('dashboard/dashboard', {
    user: req.user
  })
);
router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('dashboard/profile', {
    user: req.user
  })
);
router.get('/connections', ensureAuthenticated, (req, res) =>
  res.render('dashboard/connections', {
    user: req.user
  })
);
router.get('/notes', ensureAuthenticated, (req, res) =>
	res.render('dashboard/notes', {
		user: req.user,
	})
);

router.get('/addconnections', ensureAuthenticated, (req, res) =>
  res.render('dashboard/addconnections', {
    user: req.user
  })
);




module.exports = router;
