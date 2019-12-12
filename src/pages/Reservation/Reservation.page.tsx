import React, { Component } from 'react'
import "./Reservation.page.css"
import RestaurantInfos from '../../components/RestaurantInfos/RestaurantInfos.components'
import RestaurantImage from '../../components/RestaurantImage/RestaurantImage.components'
import ReservationInput from '../../components/ReservationInput/ReservationInput.components'

export default class Reservation extends Component<{location: any},{}> {

    componentDidMount() {
    }

    render() {
        const img = this.props.location.state.data.images;
        const rest = this.props.location.state.data;
        console.log(img)
        return (
            <div>
                <div className="image">
                    <RestaurantImage image={img} />
                </div>
                <div className="restaurant-info">
                    <RestaurantInfos restaurant={rest}/>

                </div>
                <div className="reservation-form">
                    <ReservationInput restaurant={rest}/>
                </div>
            </div>
        )
    }
}
