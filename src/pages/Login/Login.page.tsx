import React, { Component } from 'react'
import Topnav from '../../components/Topnav/Topnav.components'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import "./Login.page.css";

export default class Login extends Component {
    render() {
        return (
            <div>
                <Topnav />
                <h1>Login</h1>
                <div> HELLO</div>
                <input>
                </input>
                <input></input>
                <PrimaryButton />
            </div>
        )
    }
}
