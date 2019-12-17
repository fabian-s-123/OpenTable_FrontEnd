import React, { Component } from 'react'
import "./RestaurantImage.components.css"

export default class RestaurantImage extends Component<{image: any, name: any}, {}> {

    constructor(props: any) {
        super(props);
    }

     componentDidMount() {
    }


    render() {
        const img = this.props.image;
        const name = this.props.name;
        console.log(img)
        return (
            <div>
                <div className="image-outer-box">
                    {img && <img className="head-image" src={img[0].link}/>}
                    <div className="image-text-box">
                        <p>{name}</p>
                    </div>   
                </div>

            </div>
        )
    }
}
