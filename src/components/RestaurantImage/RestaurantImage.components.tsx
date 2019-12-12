import React, { Component } from 'react'
import "./RestaurantImage.components.css"

export default class RestaurantImage extends Component<{image: any}, {}> {

    constructor(props: any) {
        super(props);
    }

     componentDidMount() {
    }

    render() {
        const img = this.props.image;
        console.log(img)
        return (
            <div className="image">
                 {img && <img className="head-image" src={img[0].link}/>}         
            </div>
        )
    }
}
