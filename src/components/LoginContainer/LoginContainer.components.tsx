import React, { Component } from 'react'
import "./LoginContainer.components.css"
import HttpService, { HTTPMETHOD } from '../../services/http.services';
import { Redirect } from "react-router-dom"

export default class LoginContainer extends Component<{}, { email: string, password: string, redirect: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false
        }

        this.sendLoginData = this.sendLoginData.bind(this);
    }

    sendLoginData() {
        let credentials = {email: this.state.email, password: this.state.password};
        HttpService.request(HTTPMETHOD.POST, '/auth/login', credentials)
            .then(res => {
                localStorage.setItem("jws", res.data.jws)
                this.setState({ redirect: true })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <div className="login-components">
                <div>
                    <input type="email" name="email" placeholder="E-mail" value={this.state.email} onChange={this.handleEmailChange}></input>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                </div>
                <div>
                    {this.state.redirect ?
                        <Redirect to="/" /> : <button onClick={this.sendLoginData}>send login data</button>
                    }
                </div>
            </div>
        )
    }
}
