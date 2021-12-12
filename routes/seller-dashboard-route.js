var { initializeApp } = require("firebase/app");
var { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } = require("firebase/auth");
var { getFirestore, setDoc, doc, getDoc, collection } = require("firebase/firestore");
var { getStorage, ref, uploadBytes } = require("firebase/storage");
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/seller-dashboard/seller-dashboard');
});

router.get('/new', function(req, res, next){
    res.render('pages/seller-dashboard/new-commission');
})

router.get('/sales', function(req, res, next){
    res.render('pages/seller-dashboard/sales');
})

// router.post('/new/new-commission', function(req, res, next){
//   function initializeFirebaseApp(){
//     const firebaseApp = initializeApp({
//         apiKey: "AIzaSyDwAKkDF26AZa-x3hqZYaB4EFcxwGKOJOE",
//         authDomain: "sketsa-2bd5e.firebaseapp.com",
//         projectId: "sketsa-2bd5e",
//         storageBucket: "sketsa-2bd5e.appspot.com",
//         messagingSenderId: "270310736867",
//         appId: "1:270310736867:web:382525ebcd31f7b9b056d6",
//         measurementId: "G-PSZZT17JDE"   
//     });
//     return firebaseApp;
//   }
//   const firestore = getFirestore(initializeFirebaseApp());
//   const storage = getStorage(initializeFirebaseApp(), "gs://sketsa-2bd5e.appspot.com");

//   console.log("created new commission");
//   var file = document.getElementById("input-image").files[0];
//   if(file){
//     file = new Blob([JSON.stringify(file)],{type:'application/json'});
//     console.log(typeof(file));
    
//     console.log(`Input image found at ${file.name}`);
//     // var imageURL = URL.createObjectURL(file)
//     var newImage = ref(storage, `images/${file.name}`);

//     console.log(file);
//     uploadBytes(storage, file)
//     .then(function(result){
//         console.log("SUCCESSFULLY UPLOADED A FILE");
//     })

//   }
//   else{
//     console.log("Input image not found!");
//   }
// })


module.exports = router;
