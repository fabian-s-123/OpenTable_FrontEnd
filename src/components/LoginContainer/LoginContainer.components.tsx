import React, { Component } from 'react'
import "./LoginContainer.components.css"
import HttpService, { HTTPMETHOD } from '../../services/http.services';
import { Redirect } from "react-router-dom"
import SweetAlert from 'react-bootstrap-sweetalert'
import {
    Formik
} from "formik";
import {
    TextField,
    Avatar,
    Button,
    CssBaseline,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Container,
    Typography
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as yup from 'yup';


export default class LoginContainer extends Component<{}, { redirect: boolean, showSuccessAlert: boolean, showFailAlert: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            redirect: false,
            showSuccessAlert: false,
            showFailAlert: false
        }

        this.onConfirm = this.onConfirm.bind(this);
    }

    validationSchema = yup.object().shape({
        email: yup
            .string()
            .required()
            .email(),
        password: yup
            .string()
            .required(),
    })

    onConfirm() {
        this.setState({ redirect: !this.state.redirect })
    }

    showSuccessAlert() {
        this.setState({ showSuccessAlert: !this.state.showSuccessAlert })
    }

    onFailConfirm: React.FC = () => {
        return (
            <div>
                {this.setState({ showFailAlert: !this.state.showFailAlert })}
                <Redirect to="/login" />
            </div>
        )
    }

    showFailAlert() {
        this.setState({ showFailAlert: !this.state.showFailAlert })
    }

    // Sign in - Form is copied from: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

    render() {
        return (
            <div className="login-components">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div id="paper">
                        <Avatar id="avatar">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                    </Typography>
                        <Formik
                            validateOnChange={true}
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={this.validationSchema}
                            onSubmit={values => {
                                HttpService.request(HTTPMETHOD.POST, '/auth/login', values)
                                    .then(res => {
                                        localStorage.setItem("jws", res.data.jws)
                                        localStorage.setItem("user", res.data.id)
                                        this.showSuccessAlert()
                                    })
                                    .catch(err => {
                                        this.showFailAlert()
                                        console.log(err)
                                    })
                            }}
                        >
                            {({ errors, handleSubmit, handleChange, handleBlur, values }) => (
                                <form id='form' onSubmit={handleSubmit}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        helperText={errors.email}
                                        error={!!errors.email}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        helperText={errors.password}
                                        error={!!errors.password}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    {this.state.redirect ? <Redirect to="/" /> : <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        id="submit"
                                        type='submit'
                                    >
                                        Sign In
                                </Button>
                                    }
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                        </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        </Formik>
                    </div>
                </Container >
                <div>
                    {this.state.showSuccessAlert &&
                        <SweetAlert success title="Success!" onConfirm={this.onConfirm} timeout={3000}>
                            You are loggedin!
                                    </SweetAlert>
                    }
                </div>
                <div>
                    {this.state.showFailAlert &&
                        <SweetAlert warning title="Login failed!" onConfirm={this.onFailConfirm}>
                            Please check your e-mail and password!
                                    </SweetAlert>
                    }
                </div>
            </div>
        )
    }
}