import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './view-resume.styles.css';
import { getUserContact, getUserWork, getUserCerts, getUserQuals, getUserSkills } from '../../../firebase/auth.util';

import ResumeContactComp from './contact/resume.contact.component';
import ResumeWorkComp from './work/resume.work.component';
import LogoComp from '../../elements/logo/logo.component';
import ResumeCertsComp from './certs/resume.certs.component';
import ResumeQualsComp from './quals/resume.quals.component';
import ResumeSkillsComp from './skills/resume.skills.component';

const ViewResumeComp = () => { // COMPONENT

    const { userId } = useParams();
    const [contact, setContact] = useState({});
    const [work, setWork] = useState([]);
    const [certs, setCerts] = useState([]);
    const [quals, setQuals] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {

        (async function asyncFunction() {
            const userRef = getUserContact(userId);
            console.log("USERREF", userRef)
            userRef.get().then(userSnap => setContact(
                {
                    ...userSnap.data()
                }
            ));

            // WORK
            const workRef = await getUserWork(userId);
            console.log("WORKREF", workRef)
            workRef.get().then(work => {
                const experiences = work.docs.map(experienceSnap => {
                    const experience = experienceSnap.data();
                    return {
                        id: experienceSnap.id,
                        company: experience.company,
                        description: experience.description,
                        designation: experience.designation,
                        startDate: experience.startDate && experience.startDate.toDate(),
                        endDate: experience.endDate && experience.endDate.toDate(),
                        currentlyWorking: experience.currentlyWorking
                    }
                });
                setWork(experiences);
            });

            // CERTS
            const certsRef = await getUserCerts(userId);
            console.log("CERTREF", certsRef);
            certsRef.get().then(certs => {
                const certificates = certs.docs.map(certificateSnap => {
                    const certificate = certificateSnap.data();
                    return {
                        id: certificateSnap.id,
                        title: certificate.title,
                        issuedBy: certificate.issuedBy,
                        issueDate: certificate.issueDate && certificate.issueDate.toDate(),
                        validDate: certificate.validDate && certificate.validDate.toDate(),
                        noExpiry: certificate.noExpiry
                    }
                });
                setCerts(certificates);
            });

            // QUALS
            const qualsRef = await getUserQuals(userId);
            console.log("QUALREF", qualsRef);
            qualsRef.get().then(quals => {
                const qualifications = quals.docs.map(qualificationSnap => {
                    const qualification = qualificationSnap.data();
                    return {
                        id: qualificationSnap.id,
                        course: qualification.course,
                        institute: qualification.institute,
                        university: qualification.university,
                        score: qualification.score,
                        startDate: qualification.startDate && qualification.startDate.toDate(),
                        endDate: qualification.endDate && qualification.endDate.toDate(),
                        pursuing: qualification.pursuing
                    }
                });
                setQuals(qualifications);
            });

            // SKILLS
            const skillsRef = await getUserSkills(userId);
            console.log("SKILLREF", skillsRef);
            skillsRef.get().then(skills => {
                const skillset = skills.docs.map(skillSnap => {
                    const skill = skillSnap.data();
                    return {
                        id: skillSnap.id,
                        skillName: skill.skillName,
                        stars: skill.stars
                    }
                });
                setSkills(skillset);
            });
        })(); // IIFE
    }, [userId, setContact, setWork, setCerts, setQuals, setSkills]);

    return (
        <div className="View-resume bgcul">
            <LogoComp className='logo h3 fcol' />
            <ResumeContactComp contact={contact} />
            <ResumeWorkComp experiences={work} />
            <ResumeCertsComp certs={certs} />
            <ResumeQualsComp quals={quals} />
            <ResumeSkillsComp skills={skills} />
        </div>
    );
};

export default ViewResumeComp;