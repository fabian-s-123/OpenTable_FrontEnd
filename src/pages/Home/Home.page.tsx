import React, { Component } from 'react'
import Topnav from "../../components/Topnav/Topnav.components"
import LoginNav from '../../components/LoginNav/LoginNav.components'
import "./Home.page.css"

export default class Home extends Component {
    render() {
        return (

            <div>
                <div className="nav-div">
                    <Topnav />
                    <LoginNav />
                </div>


                Welcome to the Restaurant book a table site OpenTable

            </div>

        )
    }
}
