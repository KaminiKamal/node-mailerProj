var express = require('express');
var mailer = require('express-mailer');

var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'sampleUploads' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'sampleUploads/')
    },
    filename : function (req, file, cb) {
        cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/multerFile', function(req, res, next) {
  res.render('multerFile', { title: 'Express' });
});

router.post('/upload', upload.any(), function(req, res){
	console.log(req.files);
  res.send(req.files);
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
//file uploads
router.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
  res.send("uploaded");
})

module.exports = router;
