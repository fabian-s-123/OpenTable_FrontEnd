import React, { Component } from 'react'
import "./LoginContainer.components.css"
import HttpService, { HTTPMETHOD } from '../../services/http.services';
import { Redirect } from "react-router-dom"
import SweetAlert from 'react-bootstrap-sweetalert'

export default class LoginContainer extends Component<{}, { email: string, password: string, redirect: boolean, showAlert: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false,
            showAlert: false
        }

        this.sendLoginData = this.sendLoginData.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    onConfirm() {
        this.setState({ redirect: !this.state.redirect })
    }

    showAlert() {
        this.setState({ showAlert: !this.state.showAlert })
    }

    sendLoginData() {
        let credentials = { email: this.state.email, password: this.state.password };
        HttpService.request(HTTPMETHOD.POST, '/auth/login', credentials)
            .then(res => {
                localStorage.setItem("jws", res.data.jws)
                this.showAlert()
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
                <div>
                    {this.state.showAlert &&
                        <SweetAlert success title="Success!" onConfirm={this.onConfirm}>
                            You are loggedin!
                        </SweetAlert>
                    }
                </div>
            </div>
        )
    }
}
