import firebase from 'firebase/app'; // import firebase
import 'firebase/firestore'; // import firestore
import 'firebase/auth'; // import auth

var firebaseConfig = { // create config variable
    apiKey: "AIzaSyBikvoT34rNM3DlrxyhkWAwPdPU1l_dqbU",
    authDomain: "cvfydb.firebaseapp.com",
    databaseURL: "https://cvfydb.firebaseio.com",
    projectId: "cvfydb",
    storageBucket: "cvfydb.appspot.com",
    messagingSenderId: "961487001158",
    appId: "1:961487001158:web:66445baf307a707a891c47"
};

firebase.initializeApp(firebaseConfig); // initialize firebase
export const auth = firebase.auth(); // initiatize auth
export const firestore = firebase.firestore(); // initiatize firestore

const provider = new firebase.auth.GoogleAuthProvider(); // initialize provider for Google Auth
provider.setCustomParameters({ prompt: "select_account" }); // google sign in pop up

// custom functions
export const signInWithGoogle = () => auth.signInWithPopup(provider) // function to create sign in pop up with Google provider

export const createUserProfileDoc = async (userAuth, restData) => {
    if (!userAuth) return; //
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnap = await userRef.get();
    if (!userSnap.exists) { // if user not saved to database
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...restData
            })
        } catch (err) {
            console.error("Error saving user to database:", err.message);
        }
    }
    return userRef;
}

export default firebase;