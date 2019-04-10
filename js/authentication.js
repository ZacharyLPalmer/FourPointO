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

let user = (async () => await getUserFromLocalStorageAndSignIn())();

function getUserFromLocalStorageAndSignIn() {
  const authData = JSON.parse(localStorage.getItem('FourPointO:authUser'));
  if (!authData) {
    console.log("unable to retreived authData");
    setTimeout(function() {
      window.location.href = "signin.html"
    }, 3000)
    return
  }
  const { email, password } = authData
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log("signIn Success")
      return res.user
    })
    .catch(error => {
        console.log("retreived authData are unable to signin");
        console.log(error.code);
        console.log(error.message);
        setTimeout(function() {
          window.location.href = "signin.html"
        }, 3000)
        return null
    });
}

function saveDataToFirebase(data) {
  var firebaseRef = firebase.database().ref();
  firebaseRef.child("users/" + user.uid).set(data);
}

function loadDataFromFirebase() {
  return (async () => (
    await firebase
      .database()
      .ref('/users/' + user.uid)
      .once('value')
  ).val())()
}
