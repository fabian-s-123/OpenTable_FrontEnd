import React, { Component } from 'react'
import "./Topnav.components.css"

export default class Topnav extends Component {
    render() {
        return (
            <div className="topnav">
                <a href="http://localhost:3000/">Home</a>
                <a href="http://localhost:3000/reservation">Reservation</a>
                <a href="http://localhost:3000/login">Login</a>
            </div>
        )
    }
}
