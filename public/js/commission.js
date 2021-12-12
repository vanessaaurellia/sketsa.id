import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";


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

function createNewCommission(){
    const firebaseApp = initializeFirebaseApp();
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp, "gs://sketsa-2bd5e.appspot.com");

    var file = document.getElementById("input-image").files[0];
    if(file){
        var newImage = ref(storage, `images/${file.name}`);

        console.log(file);
        uploadBytes(newImage, file)
        .then(function(result){})
    }
    else{
        alert("Please upload an image!");
    }
    
    var seller = auth.currentUser.displayName;
    const newCommission = {
        seller: seller,
        style: document.getElementById("art").value,
        price: document.getElementById("price").value,
        category: document.getElementById("category").value,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        instructions: document.getElementById("instructions").value,
        tools: document.getElementById("tools").value,
        processTime: document.getElementById("process-time").value,
        tags: document.getElementById("tags").value,
        image: file.name
    };

    addDoc(collection(firestore, "commissions"), newCommission)
    .then(function(result){
        console.log(`Document written with ID ${result.id}`);
    });
}



$("#upload-data").click(createNewCommission);