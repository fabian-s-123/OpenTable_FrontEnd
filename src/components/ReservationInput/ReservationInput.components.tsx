import React, { Component } from 'react'
import "./ReservationInput.components.css"
import Restaurant from '../../models/Restaurant';
import { validate } from '@babel/types';
import HttpService, { HTTPMETHOD } from '../../services/http.services';

export default class ReservationInput extends Component <{ restaurant: Restaurant }, { groupSize: number, time: number}> {

    constructor(props: any) {
        super(props);

        this.state = {
            groupSize: 0,
            time: Date.now()
        }
    }

    handleGroupSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState ({
            groupSize: e.target.valueAsNumber
        });
    }

    handleReservationTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState ({
            time: e.target.valueAsNumber
        });
    }

    submitReservationData() {
        let credentials = {restaurantId: this.props.restaurant.id, startDateTime: this.state.time, groupSize: this.state.groupSize};
        HttpService.request(HTTPMETHOD.POST, '/customerReservations', credentials)
            .catch(err => {
                console.log(err)
            })
    }
    
    
    render() {
        const rest = this.props.restaurant;
        console.log(rest)
        return (
            <div>
                <h1>Make a reservation!</h1>
                <div>
                    <input type="number" placeholder="how many people?" value={this.state.groupSize} onChange={this.handleGroupSizeChange.bind(this)}></input>
                    <input type="date" placeholder="when?" value={this.state.time} onChange={this.handleReservationTimeChange.bind(this)}></input>
                </div>
                <button className="submit-reservation" onClick={this.submitReservationData.bind(this)}>Submit</button>
            </div>
        )
    }
}
