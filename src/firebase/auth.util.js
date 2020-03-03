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
    if (!userAuth) return;
    const userRef = getUserContact(userAuth.uid);
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
            });
        } catch (err) {
            console.error("Error saving user to database:", err.message);
        }
    }
    return userRef;
}

export const getUsers = async () => {
    return firestore.collection(`users`);
}

export const getUserContact = (userId) => {
    if (!userId) return;
    return firestore.doc(`users/${userId}`);
}

export const getUserWork = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/work`);
}

export const addUserWork = async (userId, state, restData) => {

    if (!userId) return;

    const expRef = firestore.collection(`users/${userId}/work`).doc();

    try {
        const { company, designation, description, startDate, endDate, currentlyWorking } = state;
        const createdAt = new Date();

        await expRef.set({
            company,
            designation,
            description,
            startDate,
            endDate,
            currentlyWorking,
            createdAt,
            ...restData
        });
    } catch (err) {
        console.error("Error saving work experience to database:", err.message);
    }
    return expRef.id;
}

export const deleteUserWork = async (userId, workId) => {
    if (!userId) return;
    const expRef = firestore.collection(`users/${userId}/work`).doc(workId);
    try {
        await expRef.delete();
    } catch (err) {
        console.error("Error deleting work experience from database:", err.message);
    }
    return expRef.id;
}

export const updateUser = async (userId, contactData, restData) => {
    const { displayName, email, phone, introduction, linkedin } = contactData;
    if (!userId) return;
    const userRef = firestore.collection("users").doc(userId);
    try {
        await userRef.update(
            {
                displayName: displayName,
                email: email,
                phone: phone,
                introduction: introduction,
                linkedin: linkedin,
                ...restData
            }
        );
    } catch (error) {
        console.error(error);
    }
    return userRef.id
}

// CERTIFICATIONS

export const getUserCerts = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/certs`);
}

export const addUserCert = async (userId, state, restData) => {

    if (!userId) return;

    const certRef = firestore.collection(`users/${userId}/certs`).doc();

    try {
        const { title, issuedBy, issueDate, validDate, noExpiry } = state;
        const createdAt = new Date();

        await certRef.set({
            title,
            issuedBy,
            issueDate,
            validDate,
            noExpiry,
            createdAt,
            ...restData
        });
    } catch (err) {
        console.error("Error saving certificate to database:", err.message);
    }
    return certRef.id;
}

export const deleteUserCert = async (userId, certId) => {
    if (!userId) return;
    const certRef = firestore.collection(`users/${userId}/certs`).doc(certId);
    try {
        await certRef.delete();
    } catch (err) {
        console.error("Error deleting certificate from database:", err.message);
    }
    return certRef.id;
}

// QUALIFICATIONS

export const getUserQuals = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/quals`);
}

export const addUserQual = async (userId, state, restData) => {

    if (!userId) return;

    const qualRef = firestore.collection(`users/${userId}/quals`).doc();

    try {
        const { course, institute, university, score, startDate, endDate, pursuing } = state;
        const createdAt = new Date();

        await qualRef.set({
            course,
            institute,
            university,
            score,
            startDate,
            endDate,
            pursuing,
            createdAt,
            ...restData
        });
    } catch (err) {
        console.error("Error saving qualification to database:", err.message);
    }
    return qualRef.id;
}

export const deleteUserQual = async (userId, qualId) => {
    if (!userId) return;
    const qualRef = firestore.collection(`users/${userId}/quals`).doc(qualId);
    try {
        await qualRef.delete();
    } catch (err) {
        console.error("Error deleting qualification from database:", err.message);
    }
    return qualRef.id;
}

// SKILLS

export const getUserSkills = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/skills`);
}

export const addUserSkill = async (userId, state, restData) => {

    if (!userId) return;

    const skillRef = firestore.collection(`users/${userId}/skills`).doc();

    try {
        const { skillName, stars } = state;
        const createdAt = new Date();

        await skillRef.set({
            skillName,
            stars,
            createdAt,
            ...restData
        });
    } catch (err) {
        console.error("Error saving skill to database:", err.message);
    }
    return skillRef.id;
}

export const deleteUserSkill = async (userId, skillId) => {
    if (!userId) return;
    const skillRef = firestore.collection(`users/${userId}/skills`).doc(skillId);
    try {
        await skillRef.delete();
    } catch (err) {
        console.error("Error deleting skillification from database:", err.message);
    }
    return skillRef.id;
}


export default firebase;