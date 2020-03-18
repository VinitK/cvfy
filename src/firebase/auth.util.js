import firebase from 'firebase/app'; // import firebase
import 'firebase/firestore'; // import firestore
import 'firebase/auth'; // import auth
import 'firebase/storage';

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
export const storage = firebase.storage(); // initiatize storage

const provider = new firebase.auth.GoogleAuthProvider(); // initialize provider for Google Auth
provider.setCustomParameters({ prompt: "select_account" }); // google sign in pop up

const storageRef = storage.ref(); // Create a storage reference from our storage service

// custom functions
export const signInWithGoogle = () => auth.signInWithPopup(provider).catch(error => console.error(error)); // function to create sign in pop up with Google provider

export const createUserProfileDoc = async (userAuth, restData) => {
    if (!userAuth) return;
    const userRef = getUserContact(userAuth.uid);
    const userSnap = await userRef.get();
    if (!userSnap.exists) { // if user not saved to database
        const { displayName, email, photoURL, emailVerified } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                emailVerified,
                createdAt,
                ...restData
            });
        } catch (err) {
            console.error("Error saving user to database:", err.message);
        }
    }
    return userRef;
}

export const sendMessage = async (contact, message) => {
    const msgRef = firestore.collection("messages").doc();
    try {
        const createdAt = new Date();
        await msgRef.set({
            contact,
            message,
            createdAt
        });
    } catch (err) {
        console.error("Error sending message to Vinit:", err.message);
    }
    return msgRef.id;
}

export const updateUser = async (userId, state) => {
    if (!userId) return;
    console.log("STATE", state);
    let { displayName, phone, introduction, linkedin, website, resume, resumeUrl } = state;
    const userRef = firestore.collection("users").doc(userId);
    const resumeStorageRef = storageRef.child(`${userId}/resume`);
    try {
        if (resume) {
            await resumeStorageRef.put(state.resume);
            resumeUrl = await resumeStorageRef.getDownloadURL();
        }
        await userRef.update(
            {
                displayName,
                phone,
                introduction,
                linkedin,
                website,
                resumeUrl
            }
        );
    } catch (error) {
        console.error(error);
    }
    return userRef.id
}

export const getUsers = async () => {
    return firestore.collection("users");
}

export const getUserContact = (userId) => {
    if (!userId) return;
    return firestore.doc(`users/${userId}`);
}

export const getUserWork = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/work`);
}

export const addUserWork = async (userId, state) => {

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
            createdAt
        });
    } catch (err) {
        console.error("Error saving work experience to database:", err.message);
    }
    return expRef.id;
}

export const updateUserExperience = async (userId, state, expId) => {
    if (!userId) return;
    const expRef = firestore.collection(`users/${userId}/work`).doc(expId);
    try {
        const { company, designation, description, startDate, endDate, currentlyWorking } = state;
        const updatedOn = new Date();
        await expRef.update({
            company,
            designation,
            description,
            startDate,
            endDate,
            currentlyWorking,
            updatedOn
        });
    } catch (err) {
        console.error("Error updating work experience to database:", err.message);
    }
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

// PROJECTS

export const getUserProjects = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/projects`);
}

export const addUserProject = async (userId, state, restData) => {

    if (!userId) return;

    const projectRef = firestore.collection(`users/${userId}/projects`).doc();

    try {
        const { title, company, description } = state;
        const createdAt = new Date();

        await projectRef.set(
            {
                title,
                company,
                description,
                createdAt,
                ...restData
            }
        );
    } catch (err) {
        console.error("Error saving project to database:", err.message);
    }
    return projectRef.id;
}

export const deleteUserProject = async (userId, projectId) => {
    if (!userId) return;
    const projectRef = firestore.collection(`users/${userId}/projects`).doc(projectId);
    try {
        await projectRef.delete();
    } catch (err) {
        console.error("Error deleting project from database:", err.message);
    }
    return projectRef.id;
}

// SKILLS

export const getUserSkills = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/skills`);
}

export const addUserSkill = async (userId, state) => {

    if (!userId) return;

    const skillRef = firestore.collection(`users/${userId}/skills`).doc();

    try {
        const { skillName, stars } = state;
        const createdAt = new Date();

        await skillRef.set({
            skillName,
            stars,
            createdAt
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

// JOBS

export const getJobs = async (userId) => {
    return firestore.collection("jobs");
}

export const addUserJob = async (userId, state) => {

    if (!userId) return;
    const jobRef = firestore.collection("jobs").doc();
    try {
        const { designation, company, locations, locationsArr, skills, skillsArr, description } = state;
        const createdAt = new Date();
        const createdBy = userId;

        console.log(state);

        await jobRef.set({
            designation,
            company,
            locations,
            locationsArr,
            skills,
            skillsArr,
            description,
            createdAt,
            createdBy
        });
    } catch (err) {
        console.error("Error saving job to database:", err.message);
    }
    return jobRef.id;
}

export const updateUserJob = async (userId, state, jobId) => {
    if (!userId) return;
    const jobRef = firestore.collection("jobs").doc(jobId);
    try {
        const { designation, company, locations, locationsArr, skills, skillsArr, description } = state;
        const updatedOn = new Date();
        const updatedBy = userId;

        await jobRef.update({
            designation,
            company,
            locations,
            locationsArr,
            skills,
            skillsArr,
            description,
            updatedOn,
            updatedBy
        });
    } catch (err) {
        console.error("Error updating job to database:", err.message);
    }
}

export const applyToJob = async (userId, jobId) => {
    if (!userId) return;
    const jobRef = firestore.collection("jobs").doc(jobId);
    try {
        await jobRef.update({
            applied: firebase.firestore.FieldValue.arrayUnion(firestore.doc(`/users/${userId}`))
        });
    } catch (err) {
        console.error("Error updating job application to database:", err.message);
    }
}

export const deleteUserJob = async (userId, jobId) => {
    if (!userId) return;
    const jobRef = firestore.collection("jobs").doc(jobId);
    try {
        await jobRef.delete();
    } catch (err) {
        console.error("Error deleting job from database:", err.message);
    }
    return jobRef.id;
}


export default firebase;