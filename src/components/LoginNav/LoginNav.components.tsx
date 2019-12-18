import React, { Component } from 'react'
import './LoginNav.components.css'

export default class LoginNav extends Component {
    render() {
        return (
            <div className="log-nav-container">
                <a className="log-nav-link" href="http://localhost:3000/login">Sign In</a>
            </div>

        )
    }
}

