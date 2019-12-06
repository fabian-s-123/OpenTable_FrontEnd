import React, { Component } from 'react'
import Topnav from '../../components/Topnav/Topnav.components'
import "./Login.page.css";
import LoginContainer from '../../components/LoginContainer/LoginContainer.components';

export default class Login extends Component {
    render() {
        return (
            <div>
                <Topnav />
                <LoginContainer />
            </div>
        )
    }
}
