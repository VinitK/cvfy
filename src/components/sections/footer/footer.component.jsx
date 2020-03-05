import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './footer.styles.css';
import LogoComp from '../../elements/logo/logo.component';
import InputComp from '../../elements/input/input.component';
import ButtonComp from '../../elements/button/button.component';
import { sendMessage } from '../../../firebase/auth.util';

const FooterComp = () => {

    const [state, setState] = useState(
        {
            contact: "",
            message: ""
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setState({ ...state, [name]: value });
    }

    const resetState = () => {
        setState({
            contact: "",
            message: ""
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const messageId = await sendMessage(state.contact, state.message); // db
        resetState();
    }

    return (
        <div className="Footer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 220 1350 70">
                <path fill="rgb(220, 220, 220)" fillOpacity="1" d="M0,224L120,234.7C240,245,480,267,720,277.3C960,288,1200,288,1320,288L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
            </svg>
            <div className="area">
                <div className="content">
                    <div className="credit fcol">
                        <span><LogoComp className="h3" /></span>
                        <h5 className="mtm">Project developed by <a className="unlink onHoverHighLight3" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/khandelwalvinit/">Vinit Khandelwal</a></h5>
                        <Link to="/" className="mtm">Home</Link>
                        <Link to="/resumes" className="mtm">Resumes</Link>
                        <Link to="/jobs" className="mtm">Jobs</Link>
                        <Link to="/terms" className="mtm">Terms and Conditions</Link>
                    </div>
                    <div className="card bgcul">
                        <div className="body-header bgch4">
                            <h5 className="pm">Contact Vinit</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <InputComp className="contact" type="text" id="contact" name="contact" value={state.contact} onChange={handleChange}>Your Contact Email/Phone</InputComp>
                                <InputComp className="message" type="textarea" id="message" rows="4" name="message" value={state.message} onChange={handleChange}>Message for Vinit</InputComp>
                                <ButtonComp btnType="SAVE_FORM" className="button mts">Send</ButtonComp>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterComp;