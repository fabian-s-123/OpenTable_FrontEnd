import React, { Component } from 'react'
import "./Signup.components.css"
import { Redirect } from "react-router-dom"
import SweetAlert from 'react-bootstrap-sweetalert'
import {
    Formik, setNestedObjectValues
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
import RegistrationHttpService from '../../services/registration.http.service';


export default class Signup extends Component<{}, { redirect: boolean, showSuccessAlert: boolean, showFailAlert: boolean, isLoading: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            redirect: false,
            showSuccessAlert: false,
            showFailAlert: false,
            isLoading: false
        }
    }

    validationSchema = yup.object({
        firstName: yup
            .string()
            .required(),
        lastName: yup
            .string()
            .required(),
        email: yup
            .string()
            .required()
            .email(),
        telephone: yup
            .string()
            .required(),
        password: yup
            .string()
            .required(),
    })

    onSucConfirm() {
        this.setState({ showSuccessAlert: !this.state.showSuccessAlert })
    }

    onFailConfirm() {
        this.setState({ showFailAlert: !this.state.showFailAlert })
    }

    render() {
        return (
            <div>
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
                            validateOnChange={false}
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                telephone: '',
                                password: '',
                            }}
                            validationSchema={this.validationSchema}
                            onSubmit={values => {
                                // funktioniert noch nicht!!!!
/*                                 var id = '0'
                                Object.assign(values, id) */
                                this.setState({ isLoading: true })
                                console.log(values)
                                RegistrationHttpService.makeRegistration(values)
                                .then( res => {
                                    this.setState({
                                        redirect: true,
                                        showSuccessAlert: !this.state.showSuccessAlert
                                    })
                                })
                                .catch( err => {
                                    console.log(err)
                                    console.log(err.data)
                                    this.setState({
                                        showFailAlert: !this.state.showFailAlert
                                    })
                                })
                                .finally(() => {
                                    this.setState({ isLoading: false })
                                })
                            }}
                        >
                            {({ handleSubmit, handleChange, values }) => (
                                <form id='form' onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="firstName"
                                                name="firstName"
                                                required
                                                variant="outlined"
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                onChange={handleChange}
                                                value={values.firstName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                required
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="lastName"
                                                onChange={handleChange}
                                                value={values.lastName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                required
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                onChange={handleChange}
                                                value={values.email}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                required
                                                id="telephone"
                                                label="Telephone"
                                                name="telephone"
                                                type="telephone"
                                                autoComplete="telephone"
                                                onChange={handleChange}
                                                value={values.telephone}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                required
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="password"
                                                onChange={handleChange}
                                                value={values.password}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                                label="I want to receive inspiration, marketing promotions and updates via email."
                                            />
                                        </Grid>
                                    </Grid>
                                    {this.state.redirect ? <Redirect to="/login" /> : <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        id="submit"
                                        type='submit'
                                    >
                                        Sign Up
                                    </Button>
                                    }
                                    <Grid container justify="flex-end">
                                        <Grid item>
                                            <Link href="/login" variant="body2">
                                                Already have an account? Sign in
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
                        <SweetAlert success title="Registration successful!" onConfirm={this.onSucConfirm.bind(this)} timeout={3000}>
                            You can now login with your Account!
                                    </SweetAlert>
                    }
                </div>
                <div>
                    {this.state.showFailAlert &&
                        <SweetAlert warning title="Registration failed!" onConfirm={this.onFailConfirm.bind(this)}>
                            The Registration was not successful, please try a different email address!
                                    </SweetAlert>
                    }
                </div>
            </div>
        )
    }
} 



/* 
function SignU() {

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Avatar >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
 */