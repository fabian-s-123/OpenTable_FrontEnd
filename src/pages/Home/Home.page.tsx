import React, { Component } from 'react'
import SearchBars from '../../components/SearchBars/SearchBars.components'
import "./Home.page.css"
import DisplayRestaurants from '../../components/DisplayRestaurants/DisplayRestaurants.components'

export default class Home extends Component<{ restaurantData: any},{restaurantData: any}> {


    componentDidMount(){
        this.setState({
            restaurantData: this.props.restaurantData
        })
    }

    constructor(props: any) {
        super(props);
        this.state = {
            restaurantData: []
        }
    }
    render() {
        return (
            <div className="search-container">
                <SearchBars onSearchPerfomed={(result: any)=> {
                    this.setState({restaurantData: result})
                }}/>
                {this.state.restaurantData && this.state.restaurantData.length > 0 && <DisplayRestaurants searchData={this.state.restaurantData} />}
            </div>
        )
    }
}
