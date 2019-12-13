import React, { Component } from 'react'
import "./DisplayRestaurants.components.css"
import '../SearchBars/SearchBars.components'
import { Link } from 'react-router-dom'
import Restaurant from '../../models/Restaurant';

export default class DisplayRestaurants extends Component<{ searchData: any }, {}> {
    constructor(props: any) {
        super(props)
        
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Restaurant</th>
                            <th>City</th>
                            <th>ZIP</th>
                        </tr>
                    </thead>
                    <tbody className="restaurant-item">
                        {this.props.searchData && this.props.searchData.map((item: Restaurant, key: number) => {
                            return (
                            <tr key={key}>
                                <td>
                                <Link to={{
                                    pathname: "/reservation",
                                    state: {
                                        data: item
                                    }
                                }}>{item.name}</Link>
                                </td>
                                <td>{item.city}</td>
                                <td>{item.zip}</td>     
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}