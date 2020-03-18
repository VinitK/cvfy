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
                const user = userSnap.data();
                return {
                    id: userSnap.id,
                    displayName: user.displayName,
                    introduction: user.introduction,
                    photoURL: user.photoURL,
                    createdAt: user.createdAt
                }
            });
            setUsers(users);
            setLoading(false);
        })(); // IIFE
    }, [setUsers]);

    return (
        <div className="Resumes">
            {
                loading
                    ?
                    <LoadingComp />
                    :
                    users.length > 0 && users.map(user => (
                        <a href={`/cv/${user.id}`} key={user.id}>
                            <div className="card frow neu-up mtm pm">
                                {
                                    user.photoURL && (
                                        <div className="image">
                                            <img src={user.photoURL} alt={user.displayName} />
                                        </div>
                                    )
                                }
                                <div className="text fcol fjcsb plm prm">
                                    <div>
                                        <h5 className="ch3">{user.displayName}</h5>
                                        <p className="mts">{user.introduction}</p>
                                    </div>
                                    <p className="mts">created on {user.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </a>
                    ))
            }
        </div>
    );
};

export default ResumesComp;