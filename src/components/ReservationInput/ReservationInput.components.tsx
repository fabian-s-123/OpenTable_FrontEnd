import React, { Component, useState } from 'react'
import "./ReservationInput.components.css"
import Restaurant from '../../models/Restaurant';
import HttpService, { HTTPMETHOD } from '../../services/http.services';
import SweetAlert from 'react-bootstrap-sweetalert'
import ReservationOutput from '../ReservationOutput/ReservationOutput.components';
import Loader from 'react-loader-spinner'
import { Formik } from 'formik';
import { TextField, Button, Input } from '@material-ui/core';
import * as yup from 'yup';
// @ts-ignore
import ReactTimePicker from "react-ts-timepicker";

export default class ReservationInput extends Component<{ restaurant: Restaurant }, { showSuccessAlert: boolean, showFailAlert: boolean, showRestaurantOutput: boolean, isSuccessfull: boolean, isLoading: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            showSuccessAlert: false,
            showFailAlert: false,
            showRestaurantOutput: false,
            isSuccessfull: false,
            isLoading: false
        }

        this.submitReservationData = this.submitReservationData.bind(this)
    }

    validationSchema = yup.object().shape({
        groupSize: yup
            .number(),
        time: yup
            .string(),
    })

    submitReservationData(values: any) {
        this.setState({ isLoading: true })
        let credentials = { restaurantId: this.props.restaurant.id, customerId: localStorage.getItem("user"), startDateTime: values.time + ':00.000+01:00', groupSize: values.groupSize };
        console.log(credentials)
        HttpService.request(HTTPMETHOD.POST, '/customerReservations', credentials)
            .then(res => {
                this.setState({
                    showSuccessAlert: true,
                    isLoading: false
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    showFailAlert: true
                })
            })
    }

    onConfirm() {
        this.setState({
            showSuccessAlert: false,
            showRestaurantOutput: true,
            isSuccessfull: true
        })
    }

    onFailConfirm() {
        this.setState({
            showFailAlert: false,
            isSuccessfull: false,
            showRestaurantOutput: true
        })
    }



    render() {
        const rest = this.props.restaurant;
        console.log(rest)
        return (
            <div>
                <h1>Make a reservation!</h1>
                <div>
                    {this.state.isLoading ? <div className="sweet-loading">
                        <Loader type="ThreeDots" color="#2BAD60" />
                    </div> : <div>
                            <Formik
                                validationSchema={this.validationSchema}
                                initialValues={{
                                    groupSize: '',
                                    date: '',
                                    time: '',
                                }}
                                onSubmit={values => {
                                    this.submitReservationData(values)
                                }}
                            >
                                {({ handleSubmit, handleChange, handleBlur, values }) => (
                                    <form id='form' onSubmit={handleSubmit}>

{/*                                         not working!!!!

                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            name="number"
                                            label="Number of Guests"
                                            type="number"
                                            inputProps={{ step: "1" }}
                                            autoComplete="number"
                                            autoFocus
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.groupSize}
                                        />
                                        <ReactTimePicker
                                            onChange={handleChange}
                                            value={values.time}
                                        /> */}
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            id="submit"
                                            type='submit'
                                        >
                                            Submit
                                </Button>
                                    </form>
                                )}
                            </Formik>
                            {/*                             <div className="submit-form">
                                <input type="number" placeholder="how many people?" value={this.state.groupSize} onChange={this.handleGroupSizeChange.bind(this)}></input>
                            </div>
                            <div className="submit-form">
                                <input type="datetime-local" placeholder="when?" value={this.state.time} onChange={this.handleReservationTimeChange.bind(this)}></input>
                            </div>
                            <div>
                                <button className="submit-reservation" onClick={this.submitReservationData}>Submit</button>
                            </div> */}
                        </div>
                    }
                </div>
                <div>
                    {this.state.showSuccessAlert &&
                        <SweetAlert success title="Success!" onConfirm={this.onConfirm.bind(this)} timeout={3000}>
                            Reservation confirmed!
                    </SweetAlert>
                    }
                </div>
                <div>
                    {this.state.showFailAlert &&
                        <SweetAlert warning title="Failed!" onConfirm={this.onFailConfirm.bind(this)} timeout={3000}>
                            Sorry, reservation not possible!
                    </SweetAlert>
                    }
                </div>
                {this.state.showRestaurantOutput &&
                    <div>
                        <ReservationOutput output={this.state.isSuccessfull} />
                    </div>}
            </div>
        )
    }
}
