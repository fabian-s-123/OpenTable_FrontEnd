import React, { Component } from 'react'
import "./Login.page.css";
import SearchBars from '../../components/SearchBars/SearchBars.components';
import LoginContainer from '../../components/LoginContainer/LoginContainer.components';

export default class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <LoginContainer />
            </div>
        )
    }
}
