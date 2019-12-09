import React, { Component } from 'react'
import Topnav from "../../components/Topnav/Topnav.components"
import LoginNav from '../../components/LoginNav/LoginNav.components'
import SearchBars from '../../components/SearchBars/SearchBars.components'
import "./Home.page.css"

export default class Home extends Component {
    render() {
        return (
            <div className="search-container">
                <SearchBars />
            </div>

        )
    }
}
