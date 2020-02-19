import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './navbar.styles.css'

import { auth } from '../../../firebase/auth.util';

import LogoComp from '../../elements/logo/logo.component';

function NavbarComp({ currentUser }) {
    return (
        <div className="Navbar">
            <div className="sticky card">
                <div className="content">
                    <div className="logo">
                        <LogoComp className='logo h3' />
                    </div>
                    <nav className="nav">
                        <Link to="/" className="nav-element onHover-bright">Home</Link>
                        <Link to="/loading" className="nav-element onHover-bright">Loading</Link>
                        <Link to="/resumes" className="nav-element onHover-bright">Resumes</Link>
                        <Link to="/cv/vinit" className="nav-element onHover-bright">My CV</Link>
                        {
                            currentUser
                                ?
                                <div onClick={() => auth.signOut()} className="nav-element onHover-bright">Sign out</div>
                                :
                                null
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