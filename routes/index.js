import { Router } from 'express';
var router = Router();

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

export default router;
