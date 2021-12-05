import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

//check if a user has been signed in
function initDashboard(){
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
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if(window.location.href != "http://localhost:8000/dashboard"){
                window.location.replace("/dashboard")
            }
            var username = user.displayName;
            var greetingText = $("#greeting-text");
            console.log(user);
            greetingText.text(`Good Morning, ${username}!`);
            // ...
        } else {
            // User is signed out
            console.log("No user found");
            // ...
        }
    });
    
    // const db = getFirestore(firebaseApp);
    // const querySnapshot = getDocs(collection(db, "users/"));
    // querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    // });
}


window.onload = function() {
    initDashboard();
};