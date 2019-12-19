import React, { Component } from 'react'
import "./Reservation.page.css"
import RestaurantInfos from '../../components/RestaurantInfos/RestaurantInfos.components'
import RestaurantImage from '../../components/RestaurantImage/RestaurantImage.components'
import ReservationInput from '../../components/ReservationInput/ReservationInput.components'
import ReservationOutput from '../../components/ReservationOutput/ReservationOutput.components'

export default class Reservation extends Component<{ location: any, isSuccessfull: boolean },{ isSuccessfull: boolean, showResult: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            isSuccessfull: false,
            showResult: false
        }
    }

    componentDidMount() {
        this.setState({
            isSuccessfull: this.props.isSuccessfull
        })
    }

    render() {
        const img = this.props.location.state.data.images;
        const name = this.props.location.state.data.name;
        const rest = this.props.location.state.data;
        console.log(img)
        return (
            <div>
                <div className="image">
                    <RestaurantImage image={img} name={name}/>
                </div>
                <div className="restaurant-info">
                    <RestaurantInfos restaurant={rest}/>
                </div>
                <div className="reservation-form">
                    <ReservationInput restaurant={rest} onReservation={(result: boolean) => {
                        this.setState({
                            isSuccessfull: result,
                            showResult: true
                        })
                    }} />
                </div>
                {this.state.showResult &&
                <div>
                    <ReservationOutput output={this.state.isSuccessfull}/>
                </div>
                }
            </div>
        )
    }
}
