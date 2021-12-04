var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index');
});

router.get('/login', function(req, res, next){
  res.render('pages/login');
})

router.get('/register', function(req, res, next){
  res.render('pages/register');
})

router.get('/dashboard', function(req, res, next){
  //user can go to the dashboard if they have valid token
  res.render('pages/dashboard');
})

module.exports = router;
