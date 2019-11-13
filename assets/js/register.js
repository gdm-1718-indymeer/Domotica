var firebaseConfig = {
    apiKey: "AIzaSyA5eZg8DqgXx8bN4CuxUh7S02QR2Eg9seI",
    authDomain: "demotica-1b701.firebaseapp.com",
    databaseURL: "https://demotica-1b701.firebaseio.com",
    projectId: "demotica-1b701",
    storageBucket: "demotica-1b701.appspot.com",
    messagingSenderId: "1040562848744",
    appId: "1:1040562848744:web:d59f7b4eaa42c42bcb1a5d",
    measurementId: "G-6V0HG3HHGY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



document.querySelector('.btn-login').addEventListener('click', function (e) {
    e.preventDefault();

    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise
        .then((response) => {
            console.log(response);
            localStorage.setItem('loggedIn', email);
            window.location.replace('index.html')

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
})

// sign up
document.querySelector('.btn-signup').addEventListener('click', function (e) {
    e.preventDefault();
    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;
    
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    promise
        .then((response) => {
            console.log(response);
            localStorage.setItem('loggedIn', email);
            window.location.replace('index.html')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
})