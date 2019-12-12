import React, { Component } from 'react'
import "./Reservation.page.css"
import RestaurantInfos from '../../components/RestaurantInfos/RestaurantInfos.components'
import RestaurantImage from '../../components/RestaurantImage/RestaurantImage.components'

export default class Reservation extends Component<{location: any},{}> {

    componentDidMount() {
    }

    render() {
        const img = this.props.location.state.data.images;
        console.log(img)
        return (
            <div>
                <div className="image-div">
                    <RestaurantImage image={img} /></div>
                <div>
                    <RestaurantInfos />Here you can make your Reservation!</div>
            </div>
        )
    }
}
