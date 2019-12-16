import React, { Component } from 'react';
import './ClickButton.components.css';
import { Button } from "@material-ui/core";
import { Formik, Form } from 'formik';


export default class ClickButton extends Component<{ onClick: any },{ }> {

    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <Button
                onClick={this.props.onClick}
                variant='text'
                
            >
                submit
            </Button>
        )
    }
}

