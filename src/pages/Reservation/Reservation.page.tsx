import React, { Component } from 'react'
import "./Reservation.page.css"
import Topnav from '../../components/Topnav/Topnav.components'
import RestaurantInfos from '../../components/RestaurantInfos/RestaurantInfos.components'

export default class Reservation extends Component {
    render() {
        return (
            <div>
            <div><RestaurantInfos /></div>
                Here you can make your Reservation!
            </div>
        )
    }
}
