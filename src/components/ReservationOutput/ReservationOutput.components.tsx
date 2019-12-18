import React, { Component } from 'react'
import "./ReservationOutput.components.css"

export default class ReservationOutput extends Component<{ output: boolean }, {}> {

    constructor(props: any) {
        super(props)

    }

    render() {
        console.log(this.props.output)
        return (
            <div>
                {this.props.output ? <div>Reservation successfull!</div> : <div>Reservation failed!</div>}
            </div>
        )
    }
}
