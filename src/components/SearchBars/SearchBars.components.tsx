import React, { Component } from 'react'
import "./SearchBars.components.css"
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as yup from 'yup';
import RestaurantHttpService from '../../services/restaurant.http.service';
import SweetAlert from 'react-bootstrap-sweetalert';


export default class SearchBars extends Component<{onSearchPerfomed: any}, { restaurantData: any, showFailAlert: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            restaurantData: null,
            showFailAlert: false
        }
    }

    validationSchema = yup.object().shape({
        name: yup
            .string(),
        city: yup
            .string(),
        zip: yup
            .string(),
    })

    showFailAlert() {
        this.setState({ showFailAlert: !this.state.showFailAlert })
    }

    getDataFromDb(response: any) {
        if (!response.data) {
            return;
        }

        let arr = [];
        if (Array.isArray(response.data)) {
            arr = response.data;
        } else {
            arr.push(response.data);
        }
        this.setState({ restaurantData: arr })
        this.props.onSearchPerfomed(arr);
    }

    loadRestaurantData(values: any) {
        console.log(values)
        if (values.location == '' && values.name == '') {
            this.showFailAlert()
        } else {
            RestaurantHttpService.getRestaurants(values, (response: any) => {
                this.getDataFromDb(response);
            })
        }
    }

    render() {
        return (
            <div className="search-container">
                <Formik
                    validateOnChange={true}
                    validationSchema={this.validationSchema}
                    initialValues={{
                        name: '',
                        location: '',
                    }}
                    onSubmit={values => {
                        this.loadRestaurantData(values)
                    }}
                >
                    {({ handleSubmit, handleChange, handleBlur, values }) => (
                        <form id='form' onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="name"
                                label="restaurant-name"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="location"
                                label="city-or-zip"
                                autoComplete="location"
                                autoFocus
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.location}
                            />
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
                <div>
                {this.state.showFailAlert &&
                    <SweetAlert warning title="No Data!" onConfirm={this.showFailAlert.bind(this)}>
                        Restaurant or Location input needed!
                                    </SweetAlert>
                }

                </div>
            </div>
        )
    }
}