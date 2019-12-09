import React, { Component } from 'react'
import "./LoginContainer.components.css"
import HttpService, { HTTPMETHOD } from '../../services/http.services';

export default class LoginContainer extends Component<{}, { email: string, password: string}> {

    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.sendLoginData = this.sendLoginData.bind(this);
    }

    sendLoginData() {
        let credentials = {email: this.state.email, password: this.state.password};
        console.log(credentials)
        HttpService.request(HTTPMETHOD.POST, '/auth/login', credentials)
            .then(res => {
                console.log(res)
                // localStorage.setItem("jws", res.data.jwt) <--- not working at the moment (it should save the JWT token in the browsers local storage)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({email: e.target.value});
    } 

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: e.target.value})
    }

    render() {
        return (
            <div>
                <input type="email" name="email" placeholder="E-mail" value={this.state.email} onChange={this.handleEmailChange}></input>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                <button onClick={this.sendLoginData}>send login data</button>
            </div>
        )
    }
}
