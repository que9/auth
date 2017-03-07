var express 	= require('express'),
	router 		= express.Router(),
	passport 	= require("passport");

console.info("process.env", "AUTH0_CLIENT_ID" in process.env );

var env = {
  AUTH0_CLIENT_ID: 		process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: 		process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: 	process.env.METHOD+'://'+process.env.HOST+':'+process.env.PORT+'/callback'
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', env:JSON.stringify(env) });
});


// Rendering the login template
// router.get("/login", function(req, res){
// 	console.info('/login', JSON.stringify(env));
// 	res.render("login", {title:"Login Page", env:JSON.stringify(env)});
// });


// Performing session logout and redirect to homepage
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

// Perform the final stage of authentication and redirect to /user
router.get("/callback",  passport.authenticate("auth0",{ failureRedirect:'fails'}), function(req, res){
	console.info("req.session ", req.session );
	res.redirect( req.session.returnTo || "/user");
});

module.exports = router;
