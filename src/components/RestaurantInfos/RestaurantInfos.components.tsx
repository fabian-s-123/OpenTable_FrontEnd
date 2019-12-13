import React, { Component } from 'react'
import "./RestaurantInfos.components.css"
import Restaurant from '../../models/Restaurant';

export default class RestaurantInfos extends Component<{ restaurant: Restaurant }, {}> {

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

/*     componentDidMount() {
        this.getRestaurantInfos();
    } */

    /* getRestaurantInfos() {
        this.setState({
            loading: true
        });
        HttpService.request(HTTPMETHOD.GET, '/restaurants/1').then(response => {
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
    } */

    render() {
        /* if (this.state.loading) {
            return (<div>Wir sind am laden. Eine Sekunde...</div>);
        } */
        const rest = this.props.restaurant;
        return (
            <div className="restaurant-info">
                <h1>{rest.name}</h1>
                <h2>{rest.description}</h2>
            </div>
        )
    }
}
