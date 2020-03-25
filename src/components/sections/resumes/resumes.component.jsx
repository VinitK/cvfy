import React, { useEffect, useState } from 'react';

import './resumes.styles.css';
import { getUsers } from '../../../firebase/auth.util';
import LoadingComp from '../loading/loading.component';

const ResumesComp = () => {

    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function asyncFunction() {
            const usersRef = await getUsers();
            const usersSnap = await usersRef.orderBy('createdAt', 'desc').get();
            const users = usersSnap.docs.map(userSnap => {
                const { displayName, introduction, photoURL, createdAt } = userSnap.data()
                return {
                    id: userSnap.id,
                    displayName,
                    introduction,
                    photoURL,
                    createdAt
                }
            });
            setUsers(users);
            setLoading(false);
        })(); // IIFE
    }, [setUsers]);

    return (
        <div className="Resumes card neu-up">
            <div className="card-header frow fjcc">
                <h4>Latest Resumes</h4>
            </div>
            <div className="card-body">
                {
                    loading
                        ?
                        <LoadingComp />
                        :
                        users.length > 0 && users.map(user => (
                            <div key={user.id}>
                                <a href={`/cv/${user.id}`}>
                                    <div className="card-row frow pm">
                                        {
                                            user.photoURL && (
                                                <div className="image brxs">
                                                    <img src={user.photoURL} alt={user.displayName} />
                                                </div>
                                            )
                                        }
                                        <div className="text fcol fjcsb plm prm">
                                            <div>
                                                <h5 className="ch3">{user.displayName}</h5>
                                                <p className="mts cd">{user.introduction}</p>
                                                {/* <p className="frow fwrap mtxs">{user.skillsArr && user.skillsArr.map((skill, index) => <span key={index} className="badge bgch4 mtxs mrxs fss">{skill}</span>)}</p> */}
                                            </div>
                                            <p className="mts cd">created on {user.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default ResumesComp;