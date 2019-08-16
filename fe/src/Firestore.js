import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDdHcBS1qqfCqQyMOJ4M9Wkgf2znxaSGm4",
    authDomain: "finalpro-2f0b3.firebaseapp.com",
    databaseURL: "https://finalpro-2f0b3.firebaseio.com",
    projectId: "finalpro-2f0b3",
    storageBucket: "finalpro-2f0b3.appspot.com",
    messagingSenderId: "60576509951",
    appId: "1:60576509951:web:66d8053ec9dbb6ff"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;