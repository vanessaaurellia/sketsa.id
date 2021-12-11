import { Router } from 'express';
import { initializeApp } from "firebase/app";
var router = Router();

router.get('/', function(req, res, next) {
  res.render('pages/seller/seller-dashboard');
});

export default router;
