import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyDwAKkDF26AZa-x3hqZYaB4EFcxwGKOJOE",
    authDomain: "sketsa-2bd5e.firebaseapp.com",
    projectId: "sketsa-2bd5e",
    storageBucket: "sketsa-2bd5e.appspot.com",
    messagingSenderId: "270310736867",
    appId: "1:270310736867:web:382525ebcd31f7b9b056d6",
    measurementId: "G-PSZZT17JDE"
});

var buttonRegister = $("#register-button");
buttonRegister.click(function(){
    var data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const auth = getAuth();
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

    // fetch("/users/signup", {
    //     method: "POST",
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(data)
    // }).then(function(res){
    //     if(res.status !== 200) {
    //         console.log('Looks like there was a problem. Status Code: ' + res.status);
    //         return;
    //     }
    // });
})