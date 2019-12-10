import React, { Component } from 'react'
import Topnav from '../../components/Topnav/Topnav.components'
import "./Login.page.css";
import SearchBars from '../../components/SearchBars/SearchBars.components';

export default class Login extends Component {
    render() {
        return (
            <div>
                <SearchBars />
            </div>
        )
    }
}
