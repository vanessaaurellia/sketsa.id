var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  //user can go to the dashboard if they have valid token
  res.render('pages/user-dashboard/dashboard');
})

router.get('/commission', function(req, res, next){
  res.render('pages/user-dashboard/commission-details');
})

module.exports = router;
