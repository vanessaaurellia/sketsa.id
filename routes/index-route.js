var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/homepage/index');
});

router.get('/login', function(req, res, next){
  res.render('pages/homepage/login');
})

router.get('/register', function(req, res, next){
  res.render('pages/homepage/register');
})

module.exports = router;
