import React, { Component } from 'react'
import "./SearchBars.components.css"
import HttpService, { HTTPMETHOD } from '../../services/http.services';

export default class SearchBars extends Component<{}, { data: any }> {

    constructor(props: any) {
        super(props);

        this.state = {
            data: null
        }

        this.loadRestaurantData = this.loadRestaurantData.bind(this)
    }

    loadRestaurantData() {
        HttpService.request(HTTPMETHOD.GET, '/restaurants')
            .then(data => this.setState({ data: data.data }));
    }

    render() {
        return (
            <div>
                <input type="restaurant-name" placeholder="restaurant name"/>
                <input type="restaurant-location" placeholder="location or ZIP"/>
                <button onClick={this.loadRestaurantData}>search</button>
                <table>{this.state.data && this.state.data.map((item: any) => {
                    return <tbody className="restaurant-item" key={item.id}>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    </tbody> })}
                </table>
            </div>
        )
    }
}
