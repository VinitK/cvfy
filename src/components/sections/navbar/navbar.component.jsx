import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './navbar.styles.css'

import { auth } from '../../../firebase/auth.util';

import LogoComp from '../../elements/logo/logo.component';

function NavbarComp({ currentUser }) {
    return (
        <div className="Navbar">
            <div className="sticky">
                <div className="content">
                    <div className="logo">
                        <LogoComp className='logo h3' />
                    </div>
                    <nav className="nav">
                        <Link to="/" className="nav-element onHover-bright home">Home</Link>
                        <Link to="/resumes" className="nav-element onHover-bright">Resumes</Link>
                        {
                            currentUser
                            &&
                            <>
                                <Link to={`/cv/${currentUser.id}`} className="nav-element onHover-bright">My CV</Link>
                                <div onClick={() => auth.signOut()} className="nav-element onHover-bright">Sign out</div>
                            </>
                        }
                    </nav>
                </div>
            </div>
            <div className="non-sticky"></div>
        </div>
    );
}

const mapStateToProps = state => (
    {
        currentUser: state.user.currentUser
    }
)

export default connect(mapStateToProps)(NavbarComp);