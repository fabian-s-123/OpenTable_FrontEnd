import React, { Component } from 'react'
import "./ReservationInput.components.css"
import Restaurant from '../../models/Restaurant';
import SweetAlert from 'react-bootstrap-sweetalert'
import Loader from 'react-loader-spinner'
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import ReservationHttpService from '../../services/reservation.http.service';



export default class ReservationInput extends Component<{ restaurant: Restaurant, onReservation: any }, { time: string, currentDate: MaterialUiPickersDate, showSuccessAlert: boolean, showFailAlert: boolean, showRestaurantOutput: boolean, isSuccessfull: boolean, isLoading: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            time: '',
            currentDate: new Date(),
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
            .number()
            .max(30),
        date: yup
            .date(),
    })

    convert(str: string) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2),
            hrs = ("0" + date.getHours()).slice(-2),
            mns = ("0" + date.getMinutes()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-") + "T" + [hrs, mns].join(":");
    }

    submitReservationData(values: any) {
        this.setState({ isLoading: true })
        let credentials = {
            restaurantId: this.props.restaurant.id,
            customerId: localStorage.getItem("user"),
            startDateTime: this.convert(values.date) + ':00.000+01:00',
            groupSize: values.groupSize
        };

        ReservationHttpService.makeReservation(credentials)
            .then(res => {
                this.setState({ showSuccessAlert: true })
            })
            .catch(err => {
                this.setState({ showSuccessAlert: true })
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    onConfirm() {
        this.props.onReservation(true);
        this.setState({
            showSuccessAlert: false,
            showRestaurantOutput: true,
            isSuccessfull: true
        });
    }

    onFailConfirm() {
        this.props.onReservation(false);
        this.setState({
            showFailAlert: false,
            isSuccessfull: false,
            showRestaurantOutput: true
        })
    }

    render() {
        return (
            <div className="reservation-input-container">
                {this.state.isLoading ? <div className="sweet-loading">
                    <Loader type="ThreeDots" color="#2BAD60" />
                </div> :
                    <Formik
                        validateOnChange={true}
                        validationSchema={this.validationSchema}
                        initialValues={{
                            groupSize: '',
                            date: new Date(),
                        }}
                        onSubmit={values => {
                            this.submitReservationData(values)
                        }}
                    >
                        {({ handleSubmit, handleChange, values, setFieldValue }) => (
                            <form id='form' onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="groupSize"
                                    label="Number of Guests"
                                    type="number"
                                    inputProps={{ min: "1", max: "30", step: "1" }}
                                    autoComplete="groupSize"
                                    autoFocus
                                    onChange={handleChange}
                                    value={values.groupSize}
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDateTimePicker
                                        autoOk
                                        margin="normal"
                                        fullWidth
                                        ampm={false}
                                        label="Date and Time"
                                        variant="inline"
                                        format="yyyy/MM/dd HH:mm"
                                        inputVariant="outlined"
                                        autoComplete="date"
                                        autoFocus
                                        minutesStep={15}
                                        minDate={new Date()}
                                        value={values.date}
                                        onChange={e => setFieldValue('date', e)}
                                    />
                                </MuiPickersUtilsProvider>
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
                }
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
            </div>
        )
    }
}