var buttonRegister = $("#register-button");
buttonRegister.click(function(){
    var data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    
    fetch("/username", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function(res){
        if(res.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + res.status);
            return;
        }
    });
})