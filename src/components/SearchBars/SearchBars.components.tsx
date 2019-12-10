import React, { Component } from 'react'
import "./SearchBars.components.css"
import HttpService, { HTTPMETHOD } from '../../services/http.services';

export default class SearchBars extends Component<{}, { data: any, searchName: string, searchLocation: string }> {

    constructor(props: any) {
        super(props);

        this.state = {
            data: null,
            searchName: '',
            searchLocation: ''
        }

        this.loadRestaurantData = this.loadRestaurantData.bind(this)
    }

    getDataFromDb(response: any) {
        if (!response.data) {
            return;
        }

        let arr = [];
        if (Array.isArray(response.data)) {
            arr = response.data;
        } else {
            arr.push(response.data);
        }
        this.setState({ data: arr })
    }

    loadRestaurantData() {
        if (this.state.searchLocation === '') {
            HttpService.request(HTTPMETHOD.GET, '/restaurants/name=' + this.state.searchName)
                .then(response => {
                    this.getDataFromDb(response);
                });
        } else {
            this.getDataFromCityOrZip();
        }
    }

    getDataFromCityOrZip() {
        HttpService.request(HTTPMETHOD.GET, '/restaurants/city=""/zip=' + this.state.searchLocation)
            .then(response => {
                if (response.data.length === 0) {
                    HttpService.request(HTTPMETHOD.GET, '/restaurants/city=' + this.state.searchLocation + '/zip=' + '""')
                        .then(response => {
                            this.getDataFromDb(response);
                        })
                } else {
                    this.getDataFromDb(response);
                }
            });
    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchName: e.target.value })
    }

    handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchLocation: e.target.value })
    }

    render() {
        return (
            <div className="search-container">
                <div className="search-input">
                    <input className="restaurant-name" type="text" placeholder="restaurant name" onChange={this.handleNameChange} />
                    <input className="restaurant-location" type="text" placeholder="location or ZIP" onChange={this.handleLocationChange} />
                </div>
                <div className="search-button">
                    <button onClick={this.loadRestaurantData}>search</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Restaurant</th>
                            <th>City</th>
                            <th>ZIP</th>
                        </tr>
                    </thead>
                    <tbody className="restaurant-item">
                    {this.state.data && this.state.data.map((item: any) => {
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
