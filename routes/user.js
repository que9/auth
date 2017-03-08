var express 		= require('express'),
	router 			= express.Router();

router.get('/:id',  function(req, res, next) {

  var user = require("../data/fb-profile-"+req.params.id+".json") || {};
  var birthdayDate  = user._json.birthday.split("/"),
   	  today   		= ((new Date).toLocaleDateString()).split("/");

  // console.info("_json.birthday", user._json.birthday );
  // console.info("birthday ", Number(birthdayDate[0]), Number(birthdayDate[1]) );
  // console.info("today ", today );
  // console.info( today[2], birthdayDate[2], today[2]-birthdayDate[2] );


  var isTodayBirthday = Number(birthdayDate[0]) === Number(today[0])  &&  Number(birthdayDate[1]) === Number(today[1]) ? true : false;
  var ageCategory     = today[2] - birthdayDate[2] < 40 ? 'young' : 'old';


  var funds = {
  	'old':[
  		{ name:'XYZ_', title:'This is a long description', href:'http://www.google.com' }
  	],
  	'young':[
  		{ name:'XYZ', title:'This is a long description', href:'http://www.google.com' }
  	]
  };

  var greeting = "Welcome ";
  if( isTodayBirthday )
  		greeting = "Wishing you a very happy birthday ";


  res.render("user", {
  	title:"User Profile Page",
  	user:user,
  	isTodayBirthday:isTodayBirthday,
  	age:(today[2] - birthdayDate[2]),
  	ageCategory:ageCategory,
  	greeting:greeting,
  	funds:funds[ ageCategory ],
  	userProfile: JSON.stringify(user, null, ' ')
  });
  
});


module.exports = router;