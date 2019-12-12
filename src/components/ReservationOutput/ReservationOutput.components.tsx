import React, { Component } from 'react'
import "./ReservationOutput.components.css"
import { Divider } from '@material-ui/core'

export default class ReservationOutput extends Component<{ output: boolean }, {}> {

    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <div>
                {this.props.output ? <div>Reservation successfull!</div> : <div>Reservation failed!</div>}
            </div>
        )
    }
}
