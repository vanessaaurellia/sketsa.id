var express = require('express');
var router = express.Router();

//handles all route starting with /dashboard
router.get('/', function(req, res, next){
    res.render('pages/dashboard/dashboard');
})

router.get('/commission-details', function(req, res, next){
    res.render('pages/dashboard/commission-details');
})
  
module.exports = router;