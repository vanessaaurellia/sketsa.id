import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged
     } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

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

//user create an account with email and password when user clicks register button
$("#register-button").click(function(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })  
        .catch((error) => {
            //show error message in the card html
            var warning = $("#warning-message");
            warning.css("color", "red");
            var errorCode = error.code;
            if(errorCode == "auth/email-already-in-use") {
                warning.text("Email has already been used");
            }
            else if(errorCode == "auth/invalid-email") {
                warning.text("Invalid Email");
            }
            else if(errorCode = "auth/weak-password") {
                warning.text("Weak Password");
            }
            console.log(errorCode);
        });
});

//user sign in by inputting their email and password when user clicks login button
$("#login-button").click(function(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    
    signInWithEmailAndPassword(auth, email, password)
    .then(function(userCredential){
        window.location.replace('/dashboard');
        console.log("successful login");
    })
    .catch((error) => {
        //show error message in the card html
        var warning = $("#warning-message");
        warning.css("color", "red");
        const errorCode = error.code;
        console.log(errorCode);
        if(errorCode == "auth/user-not-found" || errorCode == "auth/invalid-email"){
            warning.text("Email not found");
        }
        else if(errorCode == "auth/wrong-password"){
            warning.text("Wrong password");
        } 
    });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        var email = user.email;
        var greetingText = $("#greeting-text");
        console.log(user);
        console.log(`User email is ${email}`);
        greetingText.text(`Good morning ${email}`);
        // ...
    } else {
        // User is signed out
        console.log("No user found");
        // ...
    }
    });



