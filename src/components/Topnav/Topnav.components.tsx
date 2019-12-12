import React, { Component } from 'react'
import "./Topnav.components.css"
import LoginNav from '../LoginNav/LoginNav.components'

export default class Topnav extends Component {
    render() {
        return (
            <div className="topnav">
                <a href="http://localhost:3000/">Home</a>
            </div>
        )
    }
}
