var express = require('express');
var router = express.Router();
var path = require('path');
// var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(__dirname  + "/index.html");
  res.sendFile((path.join(__dirname  + "/../public/index.html")));

  // res.render('index', { title: 'Express' });
});

router.post('/post', function(req, res, next) {
  res.json({
    "kkk": "ddd"
  });
});




module.exports = router;
