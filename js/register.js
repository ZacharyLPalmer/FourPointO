var config = {
    apiKey: "AIzaSyDHWm4TxY0dzE7iqurAjaNj-Qpn7Nenqe4",
    authDomain: "fourpointo-5436a.firebaseapp.com",
    databaseURL: "https://fourpointo-5436a.firebaseio.com",
    projectId: "fourpointo-5436a",
    storageBucket: "fourpointo-5436a.appspot.com",
    messagingSenderId: "292235609512"
  };
  firebase.initializeApp(config);

  document.getElementById("btn").addEventListener("click", emailSignUp);

  function emailSignUp(event) {
      event.preventDefault(); // prevent default to stop refreshing page
      var email = document.getElementById("email_field").value;
      var password = document.getElementById("password_field").value;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => (window.location.href = "MyGrades.html"))
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
  }

  //Handle Account Status
  // firebase.auth().onAuthStateChanged(firebaseUser => {
  //     if (firebaseUser) {
  //         window.location.href = 'signin.html'; //After successful login, user will be redirected to home.html
  //         console.log("User signed up");
  //     } else {
  //
  //     }
  // });