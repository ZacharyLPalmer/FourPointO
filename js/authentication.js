//  Make sure to have script tag for firebase

var config = {
  apiKey: "AIzaSyDHWm4TxY0dzE7iqurAjaNj-Qpn7Nenqe4",
  authDomain: "fourpointo-5436a.firebaseapp.com",
  databaseURL: "https://fourpointo-5436a.firebaseio.com",
  projectId: "fourpointo-5436a",
  storageBucket: "fourpointo-5436a.appspot.com",
  messagingSenderId: "292235609512"
};

firebase.initializeApp(config);

let user = (async () => await getUserFromSessionStorageAndSignIn())();

function getUserFromSessionStorageAndSignIn() {
  const authData = JSON.parse(sessionStorage.getItem('FourPointO:authUser'));
  if (!authData) {
    console.log("unable to retreived authData");
    setTimeout(function() {
      window.location.href = "signin.html"
    }, 0)
    return
  }
  const { email, password } = authData

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });




  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log("signIn Success")
      loadData();
      return res.user
    })
    .catch(error => {
        console.log("retreived authData are unable to signin");
        console.log(error.code);
        console.log(error.message);
        setTimeout(function() {
          window.location.href = "signin.html"
        }, 0)
        return null
    });
}

