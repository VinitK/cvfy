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
            const usersSnap = await usersRef.get();
            const users = usersSnap.docs.map(userSnap => {
                const user = userSnap.data();
                return {
                    id: userSnap.id,
                    displayName: user.displayName,
                    introduction: user.introduction
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
                            <div className="card neu-up mtm pm">
                                <h5 className="ch3">{user.displayName}</h5>
                                <p className="mts">{user.introduction}</p>
                            </div>
                        </a>
                    ))
            }
        </div>
    );
};

export default ResumesComp;