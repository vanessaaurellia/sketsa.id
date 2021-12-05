import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";


function initializeFirebaseApp(){
    const firebaseApp = initializeApp({
        apiKey: "AIzaSyDwAKkDF26AZa-x3hqZYaB4EFcxwGKOJOE",
        authDomain: "sketsa-2bd5e.firebaseapp.com",
        projectId: "sketsa-2bd5e",
        storageBucket: "sketsa-2bd5e.appspot.com",
        messagingSenderId: "270310736867",
        appId: "1:270310736867:web:382525ebcd31f7b9b056d6",
        measurementId: "G-PSZZT17JDE"   
    });
    return firebaseApp;
}


//user create an account with email and password when user clicks register button
function register(){
    const auth = getAuth(initializeFirebaseApp());
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    //create the account
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {    
        //set the username of the user
        const user = userCredential.user;
        updateProfile(user, {
            displayName: username
       })
       .then(() => {         

       })
       .catch(function(error){
            console.log(error); 
       })
       //create a data of user personal data
       const db = getFirestore(initializeFirebaseApp());
       var userData = {
           firstName: document.getElementById("first_name").value,
           lastName: document.getElementById("last_name").value
       }
       setDoc(doc(db, `users/${username}`), userData)  
       .then(function(){
           window.location.replace('/dashboard');
           console.log(user);
           console.log(`Successfully changed the user display name to ${username}`);
       })
       .catch(function(error){
           console.log(`${error}`);
       }); 
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
        else if(errorCode == "auth/weak-password") {
            warning.text("Weak Password");
        }
    });
};

//user sign in by inputting their email and password when user clicks login button
function login(){
    const auth = getAuth(initializeFirebaseApp());
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    signInWithEmailAndPassword(auth, email, password)
    .then(function(userCredential){
        window.location.replace('/dashboard');
    })
    .catch((error) => {
        //show error message in the card html
        var warning = $("#warning-message");
        warning.css("color", "red");
        const errorCode = error.code;
        if(errorCode == "auth/user-not-found" || errorCode == "auth/invalid-email"){
            warning.text("Email not found");
        }
        else if(errorCode == "auth/wrong-password"){
            warning.text("Wrong password");
        } 
        console.log(errorCode);
    });
};

function logout(){
    const auth = getAuth(initializeFirebaseApp());
    signOut(auth)
    .then(() => {
        window.location.replace('/');
    })
    .catch((error) => {
        console.log("Not logged in yet");
    });
}

$("#logout-button").click(logout);
$("#login-button").click(login);
$("#register-button").click(register);