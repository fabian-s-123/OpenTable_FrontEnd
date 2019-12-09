import React, { Component } from 'react'
import "./RestaurantInfos.components.css"
import HttpService, { HTTPMETHOD } from '../../services/http.services'
import Restaurant from '../../models/Restaurant';

export default class RestaurantInfos extends Component<{}, { restaurant?: Restaurant, loading: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = {
            restaurant: undefined,
            loading: false
        }
    }

    componentDidMount() {
        this.getRestaurantInfos();
    }

    getRestaurantInfos() {
        this.setState({
            loading: true
        });
        HttpService.request(HTTPMETHOD.GET,'/restaurants/1').then(response => {
            if (response.status == 200 && response.data) {
                this.setState({
                    restaurant: response.data,
                    loading: false
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        }).catch((err) => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        if (this.state.loading) {
            return (<div>Wir sind am laden. Eine Sekunde...</div>);
        }

        if (!this.state.restaurant) {
            return (<div>Uppps.</div>);
        }

        return (
            <div className="restaurant-info">
            <div className="id">{this.state.restaurant.id}</div>
                <div className="name">{this.state.restaurant.name}</div>
            </div>
        )
    }
}
