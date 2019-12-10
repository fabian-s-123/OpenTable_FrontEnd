import React, { Component } from 'react'
import "./DisplayRestaurants.components.css"
import '../SearchBars/SearchBars.components'

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
                        {this.props.searchData && this.props.searchData.map((item: any) => {
                            return (<tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.city}</td>
                                <td>{item.zip}</td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
