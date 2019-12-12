import React, { Component } from 'react'
import "./LoginContainer.components.css"
import HttpService, { HTTPMETHOD } from '../../services/http.services';
import { Redirect } from "react-router-dom"
import SweetAlert from 'react-bootstrap-sweetalert'
import {
    Formik,
    Field,
    Form,
    useField,
    FieldAttributes,
    FieldArray
} from "formik";
import {
    TextField,
    Button,
    Checkbox,
    Radio,
    FormControlLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import * as yup from 'yup';

const Mytextfield: React.FC<FieldAttributes<{}>> = ({
    placeholder,
    ...props
}) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <TextField
            placeholder={placeholder}
            {...field}
            helperText={errorText}
            error={!!errorText}
        />
    );
};

export default class LoginContainer extends Component<{}, { email: string, password: string, redirect: boolean, showSuccessAlert: boolean, showFailAlert: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false,
            showSuccessAlert: false,
            showFailAlert: false
        }

        this.sendLoginData = this.sendLoginData.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    validationSchema = yup.object({
        email: yup
        .string()
        .required()
        .email(),
        password: yup
        .string()
        .required()
    });

    Sign: React.FC = () => {
        return (
            <div>
                <Formik
                validateOnChange={true}
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={this.validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    console.log('submit', data)
                    setSubmitting(false);
                }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <Mytextfield placeholder='email' name="email" />
                            <div>
                                <Mytextfield type="password" placeholder="password" name="password" />
                            </div>
                            <div>
                                <Button disabled={isSubmitting} type="submit">
                                    submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }

    onConfirm() {
        this.setState({ redirect: !this.state.redirect })
    }

    showAlert() {
        this.setState({ showSuccessAlert: !this.state.showSuccessAlert })
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
                <this.Sign />
                <div>
                    <input className="log-input-email" type="email" name="email" placeholder="E-mail" value={this.state.email} onChange={this.handleEmailChange}></input>
                    <input className="log-input-pw" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                </div>
                <div>
                    {this.state.redirect ?
                        <Redirect to="/" /> : <button className="log-btn" onClick={this.sendLoginData}>send login data</button>
                    }
                </div>
                <div>
                    {this.state.showSuccessAlert &&
                        <SweetAlert success title="Success!" onConfirm={this.onConfirm} timeout={3000}>
                            You are loggedin!
                        </SweetAlert>
                    }
                </div>
            </div>
        )
    }
}
