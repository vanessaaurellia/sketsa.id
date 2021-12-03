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

router.post('/username', function(req, res, next){
  var { email } = req.body;
  var { password } = req.body;
  const { initializeApp } = require("firebase/app");
  const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

  const firebaseApp = initializeApp({
      apiKey: "AIzaSyDwAKkDF26AZa-x3hqZYaB4EFcxwGKOJOE",
      authDomain: "sketsa-2bd5e.firebaseapp.com",
      projectId: "sketsa-2bd5e",
      storageBucket: "sketsa-2bd5e.appspot.com",
      messagingSenderId: "270310736867",
      appId: "1:270310736867:web:382525ebcd31f7b9b056d6",
      measurementId: "G-PSZZT17JDE"
  });

  const auth = getAuth(firebaseApp);
  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
      });
  res.status(200).send("Succeed");
})

module.exports = router;
