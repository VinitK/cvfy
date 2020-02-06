import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDtR8d0uFJ_03I9jMDkojgxtDDnBsHuuxg",
    authDomain: "cvfy-signin.firebaseapp.com",
    databaseURL: "https://cvfy-signin.firebaseio.com",
    projectId: "cvfy-signin",
    storageBucket: "cvfy-signin.appspot.com",
    messagingSenderId: "912678812225",
    appId: "1:912678812225:web:3bb7c3dedb0b1f0d73a4c0"
};

firebase.initializeApp(firebaseConfig);

export default firebase;