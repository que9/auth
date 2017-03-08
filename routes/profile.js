var express 		  = require('express'),
	router 			    = express.Router(),
	passport 		    = require("passport"),
	ensureLoggedIn 		= require("connect-ensure-login").ensureLoggedIn();

router.get('/', ensureLoggedIn, function(req, res, next) {  
 
  res.render("profile", {
  	title:"User Profile",
  	user:req.user,
  	userProfile: JSON.stringify( req.user, null, ' ')
  });
  
});


module.exports = router;
