import { Router } from 'express';
// import firebaseApp from "firebase/firebase-app";
// import firebaseAuth from "firebase/firebase-auth";
// import firebaseFirestore from "firebase/firebase-firestore";
var router = Router();


//handles all route starting with /dashboard
router.get('/', function(req, res, next){
    var user = initializeApp(firebaseConfig);
    //get user's data
    fetch('/dashboard/data', {
        method: "GET",
    })
    res.render('pages/dashboard/dashboard');
})

router.get('/commission-details', function(req, res, next){
    res.render('pages/dashboard/commission-details');
})
  
export default router;