import React, { Component } from 'react'
import axios from 'axios'
import "./LoginContainer.components.css"
import HttpService, { HTTPMETHOD } from '../../services/http.services';
import { Redirect } from "react-router-dom"
import SweetAlert from 'react-bootstrap-sweetalert'
import {
    Formik,
    Form,
    useField,
    FieldAttributes
} from "formik";
import {
    TextField,
    Button
} from "@material-ui/core";
import * as yup from 'yup';
import { Http2ServerResponse } from 'http2';

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
                        this.setState({email: data.email, password: data.password})
                        this.sendLoginData()
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Mytextfield placeholder='email' name="email" />
                            <div>
                                <Mytextfield type="password" placeholder="password" name="password" />
                            </div>
                            <div>
                                {this.state.showSuccessAlert &&
                                    <SweetAlert success title="Success!" onConfirm={this.onConfirm} timeout={3000}>
                                        You are loggedin!
                        </SweetAlert>
                                }
                            </div>
                            <div>
                                {this.state.redirect ? <Redirect to="/" /> : <Button disabled={isSubmitting} type="submit">
                                    submit
                                </Button>}
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

    showSuccessAlert() {
        this.setState({ showSuccessAlert: !this.state.showSuccessAlert })
    }

    onFailConfirm: React.FC = () => {
        return(
            <div>
                {this.setState({ showFailAlert: !this.state.showFailAlert })}
            <Redirect to="/login" />
            </div>
        )
    }

    showFailAlert() {
        this.setState({ showFailAlert: !this.state.showFailAlert })
    }

    sendLoginData() {
        let credentials = { email: this.state.email, password: this.state.password };
        HttpService.request(HTTPMETHOD.POST, '/auth/login', credentials)
            .then(res => {
                localStorage.setItem("jws", res.data.jws)
                localStorage.setItem("user", res.data.id)
                this.showSuccessAlert()
            })
            .catch(err => {
                this.showFailAlert()
                console.log(err)
            })
    }

    render() {
        return (
            <div className="login-components">
                <this.Sign />
                <div>
                    {this.state.showSuccessAlert &&
                        <SweetAlert success title="Success!" onConfirm={this.onConfirm} timeout={3000}>
                            You are loggedin!
                        </SweetAlert>
                    }
                </div>
                <div>
                    {this.state.showFailAlert &&
                        <SweetAlert title="Login failed!" onConfirm={this.onFailConfirm}>
                            Please check your e-mail and password!
                        </SweetAlert>
                    }
                </div>
            </div>
        )
    }
}
