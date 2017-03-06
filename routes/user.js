var express 		= require('express'),
	router 			= express.Router(),
	passport 		= require("passport"),
	ensureLoggedIn 	= require("connect-ensure-login").ensureLoggedIn();


/* Get user's profile page. */
router.get('/',  ensureLoggedIn,  function(req, res, next) {
  console.info("req.user", req.user );
  res.render("user", {
  	user:req.user,
  	userProfile: JSON.stringify(req.user, null, ' ')
  });
});


module.exports = router;
