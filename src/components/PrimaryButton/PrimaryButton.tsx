import React, { Component } from 'react';
import './PrimaryButton.css';

export default class PrimaryButton extends Component {
    render() {
        return (
            <button className="button" onClick={()=> {
                console.log("YOU CLICKED ME")
            }}>
                CLICK ME
            </button>
        )
    }
}
