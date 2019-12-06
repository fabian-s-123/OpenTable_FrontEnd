import React, { Component } from 'react'
import "./LoginContainer.components.css"
import HttpService, { HTTPMETHOD } from '../../services/http.services';

export default class LoginContainer extends Component<{}, { email: string, password: string, credentials: any}> {

    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: '',
            credentials: {email: '', password: ''}
        }

        this.sendLoginData = this.sendLoginData.bind(this);
    }

    sendLoginData() {
        console.log(this.state.credentials)
        HttpService.request(HTTPMETHOD.POST, '/auth/login', this.state.credentials)
            .then(res => {
                console.log(res)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({credentials: {email: e.target.value}});
    } 

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({credentials: {password: e.target.value}})
    }

    render() {
        return (
            <form>
                <input type="text" name="email" placeholder="E-mail" value={this.state.credentials.email} onChange={this.handleEmailChange}></input>
                <input type="password" name="password" placeholder="Password" value={this.state.credentials.password} onChange={this.handlePasswordChange}></input>
                <button onClick={this.sendLoginData}>send login data</button>
            </form>
        )
    }
}
