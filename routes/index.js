var express = require('express');
var fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: 'upload/' })
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getUsers', function(req, res, next) {
  fs.readFile('data/data.txt', function (err, data) {
    if (err != null){
      res.send(err.message);
    }else
      res.send(data.toString());
  });
});
router.post('/createUser', upload.single('avatar'), function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var data= {
    email: undefined,
    password:undefined,
    avatar: undefined,
    urlAvatar: undefined
  }
  data.email = email;
  data.password = password;
  data.avatar = req.file.originalname;
  data.urlAvatar = req.file.path;

  res.send(data)
});

module.exports = router;
