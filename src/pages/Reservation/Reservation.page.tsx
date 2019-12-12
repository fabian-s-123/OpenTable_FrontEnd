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
                <div className="image-div">
                    <RestaurantImage image={img} />
                </div>
                <div>
                    <RestaurantInfos />Here you can make your Reservation!
                </div>
                <div className="reservation-form">
                    <ReservationInput restaurant={rest}/>
                </div>
            </div>
        )
    }
}
