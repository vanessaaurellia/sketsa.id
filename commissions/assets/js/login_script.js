function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;

  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present
  
  data = {
    type: "google",
    aud: id_token,
    name: profile.getName(),
    email: profile.getEmail(),
  }

  fetch("/login/", {
    method: "POST",
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(data),
    credentials: 'include',
    redirect: 'follow'
  }).then(res => {
    console.log("Request complete! response:", res);
    //direct user to response url if response is 200
    if (res.status == 200) {
      window.location.replace(res.url);
    }
  });
}

function normalSignIn(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  data = {
    type: "normal",
    email: email,
    password: password,
  }

  fetch("/login/", {
    method: "POST",
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(data),
    credentials: 'include',
    redirect: 'follow'
  }).then(res => {
    console.log("Request complete! response:", res);
    //direct user to response url if response is 200
    if (res.status == 200) {
      window.location.replace(res.url);
    }
  });
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}

function onSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
