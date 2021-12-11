import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";


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
    const firebaseApp = initializeFirebaseApp();
    const auth = getAuth(firebaseApp);
    const fireStore = getFirestore(firebaseApp);
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var userData = {
        firstName: document.getElementById("first_name").value,
        lastName: document.getElementById("last_name").value
    }
    
    //create the account
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {    
        //set the username of the user
        const user = userCredential.user;
        updateProfile(user, {
            displayName: username
       })
       .catch(function(error){
            console.log(error); 
       }) 
       
        //create a data of user personal data
        setDoc(doc(db, `users/${email}`), userData)
        .then(function(){
            window.location.replace('/dashboard');
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
    const firebaseApp = initializeFirebaseApp();
    const auth = getAuth(firebaseApp);
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


//check if a user has been signed in
function initDashboard(){
    const firebaseApp = initializeFirebaseApp();
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, function(user) {
        if (user) {
            //move user to the dashboard if they are currently not on the dashboard
            var source = ["/login", "/register"];
            var link = "http://localhost:8000";
            for (let index = 0; index < source.length; index++) {
                const element = link + source[index];
                if(window.location.href == element){
                    window.location.replace("/dashboard");
                }
            }
            //connect to database to get the firstname of the user
            const db = getFirestore(firebaseApp);
            const userName = user["displayName"];
            //check if there is a document named userName at collection users
            getDoc(doc(db, "users", userName))
            .then(function(result){
                $("#greeting-text").text(`Good Morning, ${result.data()["firstName"]}!`);
            })
            .catch(function(error){
                console.log(`${error} user not found`);
            })
        } 
        else {
            console.log("No user found");
        }
    });   
};



//user logs out of application, then redirect them to /index
function logout(){
    const firebaseApp = initializeFirebaseApp();
    const auth = getAuth(firebaseApp);
    signOut(auth)
    .then(() => {
        window.location.replace('/');
    })
    .catch((error) => {
        console.log("Not logged in yet");
    });
};


// when a user redirects to /dashboard, get the user information
window.onload = function(){
    initDashboard();
};


//navigate to seller apps
function toSellerApps(){
    window.location.replace('/seller');
};


// navigate to user apps
function toUserApps(){
    window.location.replace('/dashboard');
};






$("#login-button").click(login);
$("#register-button").click(register);


$("#user-button").click(toUserApps);
$("#seller-button").click(toSellerApps);
$("#logout-button").click(logout);