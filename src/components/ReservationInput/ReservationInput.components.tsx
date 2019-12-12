import React, { Component } from 'react'
import "./ReservationInput.components.css"
import Restaurant from '../../models/Restaurant';
import HttpService, { HTTPMETHOD } from '../../services/http.services';
import SweetAlert from 'react-bootstrap-sweetalert'

export default class ReservationInput extends Component <{ restaurant: Restaurant }, { groupSize: any, time: any, showSuccessAlert: boolean, showFailAlert: boolean}> {

    constructor(props: any) {
        super(props);

        this.state = {
            groupSize: '',
            time: '',
            showSuccessAlert: false,
            showFailAlert: false
        }

        this.submitReservationData = this.submitReservationData.bind(this)
    }

    handleGroupSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState ({
            groupSize: e.target.valueAsNumber
        });
    }

    handleReservationTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState ({
            time: e.target.value
        });
        e.preventDefault()
    }

    submitReservationData() {
        let credentials = {restaurantId: this.props.restaurant.id, customerId: localStorage.getItem("user"), startDateTime: this.state.time+':00.000+01:00', groupSize: this.state.groupSize};
        console.log(credentials)
        HttpService.request(HTTPMETHOD.POST, '/customerReservations', credentials)
        .then(res => {
            this.setState ({
                showSuccessAlert: true
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
        this.setState ({
            showSuccessAlert: !this.state.showSuccessAlert
        })
    }

    onFailConfirm() {
        this.setState ({
            showFailAlert: false
        })
    }
    
    render() {
        const rest = this.props.restaurant;
        console.log(rest)
        return (
            <div>
                <h1>Make a reservation!</h1>
                <div className ="submit-form">
                    <input type="number" placeholder="how many people?" value={this.state.groupSize} onChange={this.handleGroupSizeChange.bind(this)}></input>
                </div>
                <div className ="submit-form">
                    <input type="datetime-local" placeholder="when?" value={this.state.time} onChange={this.handleReservationTimeChange.bind(this)}></input>
                </div>
                <button className="submit-reservation" onClick={this.submitReservationData}>Submit</button>
                <div>
                {
                this.state.showSuccessAlert && <SweetAlert success title="Success!" onConfirm={this.onConfirm.bind(this)} timeout={3000}>
                        Reservation confirmed!
                    </SweetAlert>
                }
                </div>
                <div>
                {
                this.state.showFailAlert && <SweetAlert warning title="Failed!" onConfirm={this.onFailConfirm.bind(this)} timeout={3000}>
                        Sorry, reservation not possible!
                    </SweetAlert>
                }
                </div>
            </div>
        )
    }
}
