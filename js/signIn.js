(function() {
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

    let user = null
    async function save (event) {
      user = await getUserFromSessionStorageAndSignIn() // signin User

      if (!user) {
        console.log("Please set user | sign in first")
        return
      }
      console.log("trying to save")
      var firebaseRef = firebase.database().ref();
      firebaseRef.child("/users/" + user.uid).set({
        name: "kwan3"
      });
      const data = (await firebase.database().ref('/users/' + user.uid).once('value')).val()//load data
    }

    function getUserFromSessionStorageAndSignIn() {
      const authData = JSON.parse(sessionStorage.getItem('FourPointO:authUser'));
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
            console.log("Returning to signIn page in: ")
            let counter = 10
            const interval = setInterval(function() {
              console.log(counter)
              counter--;
            }, 1000);
            setTimeout(function() {
              clearInterval(interval);
              window.location="signin.html";
            }, 10000)
            return null
        });

    }

    document.getElementById("btn").addEventListener("click", emailSignin);
    function emailSignin(event) {
        event.preventDefault(); // prevent default to stop refreshing page
        var email = document.getElementById("email_field").value;
        var password = document.getElementById("password_field").value;
        console.log("trying to signin")
        sessionStorage.setItem('FourPointO:authUser', JSON.stringify(
          { email, 
            password 
          }));
        window.location.href = "MyGrades.html";
    }
  })()