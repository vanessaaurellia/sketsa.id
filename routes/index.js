var express = require('express');
var router = express.Router();

//handles all route starting with /
router.get('/', function(req, res, next) {
  res.render('pages/index');
});

router.get('/login', function(req, res, next){
  res.render('pages/login');
})

router.get('/register', function(req, res, next){
  res.render('pages/register');
})


router.get('/seller-dashboard', function(req, res, next){
  res.render('pages/seller-dashboard');
})

module.exports = router;
