import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import './error.styles.css';
import { ReactComponent as ErrorIcon } from '../../../assets/landing/error.svg';
import LogoComp from '../../elements/logo/logo.component';

class ErrorComp extends Component {

    constructor() {
        super();

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        return this.state.hasError
            ?
            (
                <div className="Error">
                    <div className="content frow">
                        <div className="image">
                            <ErrorIcon className="error-icon" />
                        </div>
                        <div className="text fcol">
                            <h1 className="title b ch3 mtm">Something Broke</h1>
                            <h4 className="sub-title mtm">I am sorry for you had to see this. One of our developers needs to be fired. Try doing something else with <LogoComp>cvfy</LogoComp> while I push him off the terrace.</h4>
                            {this.state.errorMessage}
                            <Link className="button bgch3 pm mtxl" to="/">Home</Link>
                        </div>
                    </div>
                </div>
            )
            :
            this.props.children;
    }
}

export default ErrorComp;