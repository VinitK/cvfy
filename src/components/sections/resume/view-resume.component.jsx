import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './view-resume.styles.css';
import { getUserContact, getUserWork, getUserCerts, getUserQuals, getUserSkills, getUserProjects } from '../../../firebase/auth.util';

import ResumeContactComp from './contact/resume.contact.component';
import ResumeWorkComp from './work/resume.work.component';
import ResumeCertsComp from './certs/resume.certs.component';
import ResumeQualsComp from './quals/resume.quals.component';
import ResumeSkillsComp from './skills/resume.skills.component';
import ResumeProjectsComp from './projects/resume.projects.component';

const ViewResumeComp = () => { // COMPONENT

    const { userId } = useParams(); // from url
    const [contact, setContact] = useState({});
    const [work, setWork] = useState([]);
    const [certs, setCerts] = useState([]);
    const [quals, setQuals] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {

        (async function asyncFunction() {
            const userRef = getUserContact(userId);
            userRef.get().then(userSnap => setContact(
                {
                    ...userSnap.data()
                }
            ));

            // WORK
            const workRef = await getUserWork(userId);
            workRef.orderBy('startDate', 'desc').get().then(work => {
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
            certsRef.orderBy('issueDate', 'desc').get().then(certs => {
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
            qualsRef.orderBy('startDate', 'desc').get().then(quals => {
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

            // PROJECTS
            const projectsRef = await getUserProjects(userId);
            projectsRef.get().then(projects => {
                const projectWorks = projects.docs.map(projectWorkSnap => {
                    const projectWork = projectWorkSnap.data();
                    return {
                        id: projectWorkSnap.id,
                        title: projectWork.title,
                        company: projectWork.company,
                        description: projectWork.description
                    }
                });
                setProjects(projectWorks);
            });

            // SKILLS
            const skillsRef = await getUserSkills(userId);
            skillsRef.orderBy('stars', 'desc').get().then(skills => {
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
    }, [userId, setContact, setWork, setCerts, setQuals, setProjects, setSkills]);

    return (
        <div className="View-resume bgcul pxl">
            {
                contact.displayName &&
                <Helmet>
                    <title>{`${contact.displayName} Resume`}</title>
                    <meta name="title" content={`${contact.displayName} Resume`} />
                    <meta name="description" content={`${contact.displayName}'s cvfy resume has details of work experience, certifications, qualifications, projects and skills. With cvfy, you get access to updated resume of ${contact.displayName} at all times.`} />

                    <meta property="og:title" content={`${contact.displayName} Resume`} />
                    <meta property="og:url" content={`https://cvfy.in/cv/${userId}`} />
                    <meta property="og:description" content={`${contact.displayName}'s cvfy resume has details of work experience, certifications, qualifications, projects and skills. With cvfy, you get access to updated resume of ${contact.displayName} at all times.`} />
                    <meta property="og:image" content={contact.photoURL} />
                    <meta property="og:type" content="WebPage" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={`${contact.displayName} Resume`} />
                    <meta name="twitter:url" content={`https://cvfy.in/cv/${userId}`} />
                    <meta name="twitter:description" content={`${contact.displayName}'s cvfy resume has details of work experience, certifications, qualifications, projects and skills. With cvfy, you get access to updated resume of ${contact.displayName} at all times.`} />
                    <meta name="twitter:image" content={contact.photoURL} />

                    <meta itemprop="name" content={`${contact.displayName} Resume`} />
                    <meta itemprop="description" content={`${contact.displayName}'s cvfy resume has details of work experience, certifications, qualifications, projects and skills. With cvfy, you get access to updated resume of ${contact.displayName} at all times.`} />
                    <meta itemprop="image" content={contact.photoURL} />
                </Helmet>
            }
            <ResumeContactComp contact={contact} />
            <ResumeWorkComp experiences={work} />
            <ResumeCertsComp certs={certs} />
            <ResumeQualsComp quals={quals} />
            <ResumeProjectsComp projects={projects} />
            <ResumeSkillsComp skills={skills} />
        </div>
    );
};

export default ViewResumeComp;