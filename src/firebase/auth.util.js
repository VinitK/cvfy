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

export const getUserContact = (userId) => {
    if (!userId) return;
    return firestore.doc(`users/${userId}`);
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


export const getUserWork = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/work`);
}

export const addUserWork = async (userId, state) => {
    if (!userId) return;

    const { company, designation, description, startDate, endDate, currentlyWorking } = state;
    const createdAt = new Date();

    // 1. Adding experience to user
    const userExpRef = firestore.collection("users").doc(userId).collection("work").doc();
    try {
        await userExpRef.set({
            company,
            companyRef: firestore.doc(`companies/${company}`),
            designation,
            designationRef: firestore.doc(`designations/${designation}`),
            description,
            startDate,
            endDate,
            currentlyWorking,
            createdAt
        });
    } catch (err) {
        console.error("Error saving work experience to database:", err.message);
    }

    // 2. Adding user to company
    const companyUserRef = firestore.collection("companies").doc(company).collection("associated").doc(userId);
    try {
        await companyUserRef.set(
            {
                userRef: firestore.doc(`users/${userId}`),
                displayName: state.displayName,
                introduction: state.introduction,
                photoURL: state.photoURL
            }
        );
    } catch (err) {
        console.error("Error saving user to company.", err.message);
    }

    // 3. Adding designation to company
    const designationUserRef = firestore.collection("designations").doc(designation).collection("associated").doc(userId);
    try {
        await designationUserRef.set(
            {
                userRef: firestore.doc(`users/${userId}`),
                displayName: state.displayName,
                introduction: state.introduction,
                photoURL: state.photoURL
            }
        );
    } catch (err) {
        console.error("Error saving user to designation.", err.message);
    }

    return userExpRef.id;
}

export const updateUserExperience = async (userId, state, experience) => {
    if (!userId) return;

    await deleteUserWork(userId, experience);
    const userExpRefId = await addUserWork(userId, state);

    return userExpRefId;
}

export const deleteUserWork = async (userId, state) => {
    if (!userId) return;

    // 1 Deleting Experience
    const userExpRef = firestore.collection(`users/${userId}/work`).doc(state.id);
    try {
        await userExpRef.delete();
    } catch (err) {
        console.error("Error deleting work experience from user.", err.message);
    }

    // 2 Deleting User from Company
    const userCompaniesRef = firestore.collection(`companies/${state.company}/associated`).doc(userId);
    try {
        await userCompaniesRef.delete();
    } catch (err) {
        console.error("Error deleting user from Company.", err.message);
    }

    // 2 Deleting User from Company
    const userDesignationsRef = firestore.collection(`designations/${state.designation}/associated`).doc(userId);
    try {
        await userDesignationsRef.delete();
    } catch (err) {
        console.error("Error deleting user from Designation.", err.message);
    }

    return userExpRef.id;
}


// CERTIFICATIONS

export const getUserCerts = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/certs`);
}

export const addUserCert = async (userId, state) => {
    if (!userId) return;

    const { title, issuedBy, issueDate, validDate, noExpiry, displayName, introduction, photoURL } = state;
    const createdAt = new Date();

    // 1. Adding Cert to User
    const certUserRef = firestore.collection(`users/${userId}/certs`).doc(title);
    try {
        await certUserRef.set({
            title,
            certRef: firestore.doc(`certs/${title}`),
            issuedBy,
            issuedByRef: firestore.doc(`certProviders/${issuedBy}`),
            issueDate,
            validDate,
            noExpiry,
            createdAt
        });
    } catch (err) {
        console.error("Error saving certificate to database:", err.message);
    }

    // 2. Adding Cert to Certs
    const certRef = firestore.collection("certs").doc(title);
    try {
        await certRef.set(
            {
                certProviderRef: firestore.doc(`certProviders/${issuedBy}`),
                certProvider: title
            }
        );
    } catch (err) {
        console.error("Error adding to certs.", err.message);
    }

    // 3. Add Provider to certProviders
    const certProviderRef = firestore.collection("certProviders").doc(issuedBy).collection("certs").doc(title);
    try {
        await certProviderRef.set(
            {
                certRef: firestore.doc(`certs/${title}`),
                cert: title
            }
        );
    } catch (err) {
        console.error("Error adding to certProviders.", err.message);
    }

    // 4. Add user to certs
    const userCertRef = firestore.collection("certs").doc(title).collection("associated").doc(userId);
    try {
        await userCertRef.set(
            {
                userRef: firestore.doc(`users/${userId}`),
                displayName,
                introduction,
                photoURL
            }
        );
    } catch (err) {
        console.error("Error adding user to cert in certs.", err.message);
    }

    return certRef.id;
}

export const deleteUserCert = async (userId, cert) => {
    if (!userId) return;

    // 1 Deleting Cert from User
    const certRef = firestore.collection(`users/${userId}/certs`).doc(cert.id);
    try {
        await certRef.delete();
    } catch (err) {
        console.error("Error deleting certificate from database:", err.message);
    }

    // 2 Deleting User from Certs
    const userCertsRef = firestore.collection(`certs/${cert.title}/associated`).doc(userId);
    try {
        await userCertsRef.delete();
    } catch (err) {
        console.error("Error deleting user from Certs.", err.message);
    }

    return certRef.id;
}

// QUALIFICATIONS

export const getUserQuals = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/quals`);
}

export const addUserQual = async (userId, state) => {

    if (!userId) return;

    const { course, institute, university, score, startDate, endDate, pursuing, displayName, introduction, photoURL } = state;
    const createdAt = new Date();

    const qualRef = firestore.collection(`users/${userId}/quals`).doc();
    try {
        await qualRef.set({
            course,
            courseRef: firestore.doc(`courses/${course}`),
            institute,
            instituteRef: firestore.doc(`institutes/${institute}`),
            university,
            universityRef: firestore.doc(`universities/${university}`),
            score,
            startDate,
            endDate,
            pursuing,
            createdAt
        });
    } catch (err) {
        console.error("Error saving qualification to database:", err.message);
    }

    const associatedToCourseRef = firestore.collection("courses").doc(course).collection("associated").doc(userId);
    try {
        await associatedToCourseRef.set(
            {
                userRef: firestore.doc(`users/${userId}`),
                displayName,
                introduction,
                photoURL
            }
        );
    } catch (err) {
        console.error("Error adding to course > associated user.", err.message);
    }

    const associatedToInstituteRef = firestore.collection("institutes").doc(institute).collection("associated").doc(userId);
    try {
        await associatedToInstituteRef.set(
            {
                userRef: firestore.doc(`users/${userId}`),
                displayName,
                introduction,
                photoURL
            }
        );
    } catch (err) {
        console.error("Error adding to institute > associated user.", err.message);
    }

    const associatedToUniversityRef = firestore.collection("universities").doc(university).collection("associated").doc(userId);
    try {
        await associatedToUniversityRef.set(
            {
                userRef: firestore.doc(`users/${userId}`),
                displayName,
                introduction,
                photoURL
            }
        );
    } catch (err) {
        console.error("Error adding to university > associated user.", err.message);
    }

    return qualRef.id;
}

export const deleteUserQual = async (userId, qual) => {
    if (!userId) return;

    const qualRef = firestore.collection(`users/${userId}/quals`).doc(qual.id);
    try {
        await qualRef.delete();
    } catch (err) {
        console.error("Error deleting qualification from database:", err.message);
    }

    const associatedCourseRef = firestore.collection(`courses/${qual.course}/associated`).doc(userId);
    try {
        await associatedCourseRef.delete();
    } catch (err) {
        console.error("Error deleting user from course.", err.message);
    }

    const associatedInstituteRef = firestore.collection(`institutes/${qual.institute}/associated`).doc(userId);
    try {
        await associatedInstituteRef.delete();
    } catch (err) {
        console.error("Error deleting user from institute.", err.message);
    }

    const associatedUniversityRef = firestore.collection(`universities/${qual.university}/associated`).doc(userId);
    try {
        await associatedUniversityRef.delete();
    } catch (err) {
        console.error("Error deleting user from university.", err.message);
    }

    return qualRef.id;
}

// PROJECTS

export const getUserProjects = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/projects`);
}

export const addUserProject = async (userId, state) => {

    if (!userId) return;

    const { title, company, description, displayName, introduction, photoURL } = state;

    const projectRef = firestore.collection(`users/${userId}/projects`).doc();
    try {
        const createdAt = new Date();

        await projectRef.set(
            {
                title,
                company,
                companyRef: firestore.doc(`companies/${company}`),
                description,
                createdAt
            }
        );
    } catch (err) {
        console.error("Error saving project to user.", err.message);
    }

    const associatedRef = firestore.collection("companies").doc(company).collection("associated").doc(userId);
    try {
        await associatedRef.set(
            {
                userRef: firestore.doc(`users/${userId}`),
                displayName,
                introduction,
                photoURL
            }
        );
    } catch (err) {
        console.error("Error adding to company > associated user.", err.message);
    }

    return projectRef.id;
}

export const deleteUserProject = async (userId, project) => {
    if (!userId) return;

    const projectRef = firestore.collection(`users/${userId}/projects`).doc(project.id);
    try {
        await projectRef.delete();
    } catch (err) {
        console.error("Error deleting project from database:", err.message);
    }

    const associatedRef = firestore.collection(`companies/${project.company}/associated`).doc(userId);
    try {
        await associatedRef.delete();
    } catch (err) {
        console.error("Error deleting project from database:", err.message);
    }

    return projectRef.id;
}

// SKILLS

export const getSkills = async (userId) => {
    if (!userId) return;
    return firestore.collection("skills");
}

export const getUserSkills = async (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/skills`);
}

export const addUserSkill = async (userId, state) => {
    if (!userId) return;

    const { skillName, stars, displayName, introduction, photoURL } = state;

    const skillUserRef = firestore.collection("skills").doc(skillName).collection(stars).doc(userId);
    try {
        await skillUserRef.set(
            {
                userRef: firestore.doc(`users/${userId}`),
                skillName,
                stars,
                displayName,
                introduction,
                photoURL
            }
        );
    } catch (err) {
        console.error("Error creating skill and adding user to skills.", err.message);
    }

    const userSkillRef = firestore.collection("users").doc(userId).collection("skills").doc(skillName);
    try {
        await userSkillRef.set({
            skillRef: firestore.doc(`skills/${skillName}`),
            skillName,
            stars,
            createdAt: new Date()
        });
    } catch (err) {
        console.error("Error adding skill to user:", err.message);
    }

    return userSkillRef.id;
}

export const deleteUserSkill = async (userId, skill) => {
    if (!userId) return;

    const userSkillRef = firestore.collection(`users/${userId}/skills`).doc(skill.id);
    try {
        await userSkillRef.delete();
    } catch (err) {
        console.error("Error deleting skill from user:", err.message);
    }

    const skillUserRef = firestore.collection(`skills/${skill.id}/${skill.stars}`).doc(userId);
    try {
        await skillUserRef.delete();
    } catch (err) {
        console.error("Error deleting user from skill:", err.message);
    }

    return userSkillRef.id;
}

// JOBS

export const getJobs = () => {
    return firestore.collection("jobs");
}

export const getUserJobs = (userId) => {
    if (!userId) return;
    return firestore.collection(`users/${userId}/jobs`);
}

export const getAppliedList = (jobId) => {
    return firestore.collection(`jobs/${jobId}/applied`);
}

export const addUserJob = async (currentUser, state) => {
    if (!currentUser.id) return;

    const { designation, company, locationsArr, skillsArr, description } = state;
    const userId = currentUser.id;
    const { displayName, photoURL } = currentUser;
    const createdAt = new Date();
    const userRef = firestore.doc(`users/${userId}`);
    const created = [{ createdBy: userRef, createdAt, displayName, photoURL, createdById: userId }];
    const designationRef = firestore.doc(`designations/${designation}`);
    const designationObj = { designation, designationRef };
    const companyRef = firestore.doc(`companies/${company}`);
    const companyObj = { company, companyRef }
    const locationsArrRefs = locationsArr.map(location => ({ location, locationRef: firestore.doc(`locations/${location}`) }));
    const skillsArrRefs = skillsArr.map(skill => ({ skill, skillRef: firestore.doc(`skills/${skill}`) }));

    // CREATE JOB
    const jobRef = firestore.collection("jobs").doc(createdAt.toISOString());
    try {
        await jobRef.set({
            designationObj,
            companyObj,
            locationsArrRefs,
            skillsArrRefs,
            description,
            created, // array of users
            updatedOn: createdAt
        });
    } catch (err) {
        console.error("Error saving job to jobs.", err.message);
    }

    // ADD REFERENCE AND COPY IN USER
    const userJobRef = firestore.collection(`users/${userId}/jobs`).doc(jobRef.id);
    try {
        await userJobRef.set({
            designationObj,
            companyObj,
            locationsArrRefs,
            skillsArrRefs,
            description,
            created, // array of users
            jobRef,
            updatedOn: createdAt
        });
    } catch (err) {
        console.error("Error saving job to user.", err.message);
    }

    // ADDING JOB TO COMPANIES
    const jobInCompanies = firestore.collection("companies").doc(company).collection("jobs").doc(jobRef.id);
    try {
        await jobInCompanies.set(
            {
                designationObj,
                companyObj,
                locationsArrRefs,
                skillsArrRefs,
                jobRef,
                created, // array of users
                updatedOn: createdAt
            }
        );
    } catch (err) {
        console.error("Error adding job to companies > associated job.", err.message);
    }


    // ADDING USER TO COMPANIES
    const userInCompanies = firestore.collection("companies").doc(company).collection("hiring").doc(userId);
    try {
        await userInCompanies.set(
            {
                designationObj,
                companyObj,
                locationsArrRefs,
                skillsArrRefs,
                jobRef,
                created, // array of users
                updatedOn: createdAt
            }
        );
    } catch (err) {
        console.error("Error adding user to companies > associated user.", err.message);
    }

    // ADDING JOB TO DESIGNATION
    const jobToDesignations = firestore.collection("designations").doc(designation).collection("jobs").doc(jobRef.id);
    try {
        await jobToDesignations.set(
            {
                designationObj,
                companyObj,
                locationsArrRefs,
                skillsArrRefs,
                jobRef,
                created, // array of users
                updatedOn: createdAt
            }
        );
    } catch (err) {
        console.error("Error adding job to designations > associated job.", err.message);
    }

    // ADDING JOB TO SKILLS
    skillsArrRefs.map(async s => {
        const jobInSkill = firestore.collection("skills").doc(s.skill).collection('jobs').doc(jobRef.id);
        try {
            await jobInSkill.set(
                {
                    designationObj,
                    companyObj,
                    locationsArrRefs,
                    skillsArrRefs,
                    jobRef,
                    created, // array of users
                    updatedOn: createdAt
                }
            )
        } catch (err) {
            console.error("Error adding job to skills > associated jobs.", err.message);
        }
    });

    // ADDING JOB TO LOCATIONS
    locationsArrRefs.map(async l => {
        const jobInLocation = firestore.collection("locations").doc(l.location).collection('jobs').doc(jobRef.id);
        try {
            await jobInLocation.set(
                {
                    designationObj,
                    companyObj,
                    locationsArrRefs,
                    skillsArrRefs,
                    jobRef,
                    created, // array of users
                    updatedOn: createdAt
                }
            )
        } catch (err) {
            console.error("Error adding to locations > associated jobs.", err.message);
        }
    });

    return jobRef.id;
}

export const updateUserJob = async (currentUser, newJob, oldJob) => {
    if (!currentUser.id) return;
    const { id, designation, company, locationsArr, skillsArr, description } = newJob;
    const userId = currentUser.id;
    const { displayName, photoURL } = currentUser;
    const createdAt = new Date();
    const userRef = firestore.doc(`users/${userId}`);
    const updatedObj = { createdBy: userRef, createdAt, displayName, photoURL, createdById: userId };
    const designationRef = firestore.doc(`designations/${designation}`);
    const designationObj = { designation, designationRef };
    const companyRef = firestore.doc(`companies/${company}`);
    const companyObj = { company, companyRef }
    const locationsArrRefs = locationsArr.map(location => ({ location, locationRef: firestore.doc(`locations/${location}`) }));
    const skillsArrRefs = skillsArr.map(skill => ({ skill, skillRef: firestore.doc(`skills/${skill}`) }));

    // job ref
    const jobRef = firestore.collection("jobs").doc(id);

    // set new job to id in jobs
    try {
        await jobRef.update({
            designationObj,
            companyObj,
            locationsArrRefs,
            skillsArrRefs,
            description,
            updatedOn: createdAt
        });
    } catch (err) {
        console.error("Error updating jobs > job with new job.", err.message);
    }

    // set new job to id in user's jobs collection
    const jobInUser = firestore.collection(`users/${userId}/jobs`).doc(jobRef.id);
    try {
        await jobInUser.update({
            designationObj,
            companyObj,
            locationsArrRefs,
            skillsArrRefs,
            description,
            jobRef,
            updatedOn: createdAt
        });
    } catch (err) {
        console.error("Error updating job in user.", err.message);
    }

    // delete job from company
    if (company !== oldJob.companyObj.company) { // if company is changed then delete job from company
        try {
            oldJob.companyObj.companyRef.collection("jobs").doc(jobRef.id).delete();
        } catch (err) {
            console.log("Failed to delete job from company.");
        }

        // and add job to the new company
        const jobInCompany = companyRef.collection("jobs").doc(jobRef.id);
        try {
            await jobInCompany.set(
                {
                    jobRef,
                    created: updatedObj
                }
            );
        } catch (err) {
            console.error("Error adding job to companies > company > associated job.", err.message);
        }
    }

    // delete job from designation
    if (designation !== oldJob.designationObj.designation) { // if designation is changed then delete job from designation
        try {
            oldJob.designationObj.designationRef.collection("jobs").doc(jobRef.id).delete();
        } catch (err) {
            console.log("Failed to delete job from designation.");
        }

        // and add job to the new Designation
        const jobInDesignation = designationRef.collection("jobs").doc(jobRef.id);
        try {
            await jobInDesignation.set(
                {
                    jobRef,
                    created: updatedObj
                }
            );
        } catch (err) {
            console.error("Error adding job to designations > designation > associated job.", err.message);
        }
    }

    // ADDING JOB TO SKILLS
    skillsArr.map(async skill => {
        const jobInSkill = firestore.collection("skills").doc(skill).collection('jobs').doc(jobRef.id);
        try {
            await jobInSkill.update(
                {
                    designationObj,
                    companyObj,
                    locationsArrRefs,
                    skillsArrRefs,
                    jobRef,
                    updatedOn: createdAt
                }
            )
        } catch (err) {
            console.error("Error adding job to skills > associated jobs.", err.message);
        }
    });

    // ADDING JOB TO LOCATIONS
    locationsArr.map(async location => {
        const jobInLocation = firestore.collection("locations").doc(location).collection('jobs').doc(jobRef.id);
        try {
            await jobInLocation.set(
                {
                    designationObj,
                    companyObj,
                    locationsArrRefs,
                    skillsArrRefs,
                    jobRef,
                    updatedOn: createdAt
                }
            )
        } catch (err) {
            console.error("Error adding to locations > associated jobs.", err.message);
        }
    });

    // delete job from new skills
    // delete job from removed skills

    // delete job from new locations
    // delete user from removed locations


    return jobRef.id;
}

export const deleteUserJob = async (userId, jobId) => {
    if (!userId) return;

    const jobRef = firestore.collection("jobs").doc(jobId);
    try {
        await jobRef.delete();
    } catch (err) {
        console.error("Error deleting job from jobs", err.message);
    }

    const userJobsRef = firestore.collection("users").doc(userId).collection("jobs").doc(jobId);
    try {
        await userJobsRef.delete();
    } catch (err) {
        console.error("Error deleting job from user.", err.message);
    }

    // delete from user pending

    return jobRef.id;
}

/* <ButtonComp btnType="SAVE_FORM" onClick={() => handleUpdateUser()} className="button pm">Update</ButtonComp>
export const reverse = async (obj, jobId) => {

    const jobRef = firestore.doc("jobs/XgJPOouoDqdqwrnhkPto");
    jobRef.set({
        companyObj: {
            company: "Xoriant Solutions Pvt. Ltd.",
            companyRef: firestore.doc('companies/Xoriant Solutions Pvt. Ltd.'),
        },
        created: [
            {
                createdAt: new Date(),
                createdBy: firestore.doc('users/nlu395fs6UckQoN2vLTmETy2ybP2'),
                createdById: "nlu395fs6UckQoN2vLTmETy2ybP2",
                displayName: "Ronak Sequeira",
                photoURL: "https://lh3.googleusercontent.com/a-/AOh14Gg_nCYCbySx6tDUp6mDfKvh2A9a9wTikhaCDkypqw"
            },
        ],
        description: "Required experienceCloud - AWS Experience (2-3 years) Languages - Java, Python AWS Infra Services - EC2, EBS, VPC Serverless - Lambda, AWS Glue, AWS Data Pipeline Data Storage - AWS RedShift, AWS RDS, AWS DynamoDB Good Programming skills with understanding of multi-threading along with ability of writing performant and robust code with good knowledge of impact of the code on CPU and Memory usage. Be able to understand significance of error and exception handling in the Cloud or Serverless environment. Good problem solving and debugging skills for developing solutions using AWS cloud services.",
        designationObj: {
            designation: "Senior AWS Developer",
            designationRef: firestore.doc('designations/Senior AWS Developer')
        },
        locationsArrRefs: [
            {
                location: "Pune",
                locationRef: firestore.doc('locations/Pune')
            }
        ],
        skillsArrRefs: [
            {
                skill: "AWS",
                skillRef: firestore.doc('skills/AWS')
            },
            {
                skill: "Java",
                skillRef: firestore.doc('skills/Java')
            },
            {
                skill: "Python",
                skillRef: firestore.doc('skills/Python')
            }
        ],
        updatedOn: new Date()
    })
} */

export const applyToJob = async (currentUser, job) => {
    if (!currentUser.id) return;

    // adding user to jobs
    const userObj = {
        appliedBy: firestore.doc(`/users/${currentUser.id}`),
        createdAt: new Date(),
        userId: currentUser.id,
        displayName: currentUser.displayName,
        introduction: currentUser.introduction,
        photoURL: currentUser.photoURL
    }
    const jobRef = firestore.doc(`jobs/${job.id}`);
    try {
        await jobRef.update({
            applied: firebase.firestore.FieldValue.arrayUnion(userObj)
        });
    } catch (err) {
        console.error("Error saving user to applied of job.", err.message);
    }

    // adding job to user
    const jobObj = {
        jobId: job.id,
        appliedOn: firestore.doc(`/jobs/${job.id}`),
        createdAt: new Date(),
        designationObj: job.designationObj,
        companyObj: job.companyObj
    }
    const userRef = firestore.doc(`users/${currentUser.id}`);
    console.log("CHECK", userRef, jobObj)
    try {
        await userRef.update({
            applied: firebase.firestore.FieldValue.arrayUnion(jobObj)
        });
    } catch (err) {
        console.error("Error saving job to user's applied list.", err.message);
    }

    return jobRef.id;
}

export default firebase;