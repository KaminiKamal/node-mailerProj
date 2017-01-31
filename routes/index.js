var express = require('express');
var  mailer = require('express-mailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/mymail', function (req, res, next) {
	var usr = req.body.usermail;
	var des = req.body.description;
	var info = req.body.topic;
  res.mailer.send('email', {
    to: usr,
    subject: info,
    content: des
   // otherProperty: 'Other Property'
  }, function (err, message) {
  	console.log(err, message);
    if (err) {
      // handle error 
      console.log(err);
      res.send('There was an error rendering the email');
      return;
    }
    res.header('Content-Type', 'text/plain');
    res.send("sent");
  });
});
module.exports = router;
