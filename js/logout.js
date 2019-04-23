// Initialize Firebase
var config = {
    apiKey: "AIzaSyDHWm4TxY0dzE7iqurAjaNj-Qpn7Nenqe4",
    authDomain: "fourpointo-5436a.firebaseapp.com",
    databaseURL: "https://fourpointo-5436a.firebaseio.com",
    projectId: "fourpointo-5436a",
    storageBucket: "fourpointo-5436a.appspot.com",
    messagingSenderId: "292235609512"
  };
  firebase.initializeApp(config);

  

  function logout() {
      firebase.auth().signOut().then(function() {
          console.log("Logged out!");
          window.location.href = 'GPACalc.html';
          localStorage.clear();
          sessionStorage.clear();
      }, function(error) {
          console.log(error.code);
          console.log(error.message);
      });
  }