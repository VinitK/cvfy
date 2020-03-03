import React, { useEffect, useState } from 'react';

import './resumes.styles.css';
import { getUsers } from '../../../firebase/auth.util';

const ResumesComp = () => {

    const [users, setUsers] = useState({});

    useEffect(() => {

        (async function asyncFunction() {

            const usersRef = await getUsers();
            usersRef.get().then(users => {
                const userset = users.docs.map(userSnap => {
                    const user = userSnap.data();
                    return {
                        id: userSnap.id,
                        displayName: user.displayName,
                        introduction: user.introduction
                    }
                });
                setUsers(userset);
            });
        })(); // IIFE
    }, [setUsers]);

    return (
        <div className="Resumes">
            {users.length > 0 && users.map(user => (
                <a href={`/cv/${user.id}`} key={user.id}>
                    <div className="card neu-up mtm pm">
                        <h4 className="ch3">{user.displayName}</h4>
                        <h5 className="mts">{user.introduction}</h5>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ResumesComp;