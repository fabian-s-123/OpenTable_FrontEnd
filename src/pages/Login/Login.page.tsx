import React, { Component } from 'react'
import "./Login.page.css";
import LoginContainer from '../../components/LoginContainer/LoginContainer.components';

export default class Login extends Component<{ isSubmitting: any },{}> {
    render() {
        return (
            <div className="login-container">
                <LoginContainer { ... this.props.isSubmitting } />
            </div>
        )
    }
}
