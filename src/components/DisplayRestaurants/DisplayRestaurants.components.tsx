import React, { Component } from 'react'
import "./DisplayRestaurants.components.css"
import '../SearchBars/SearchBars.components'
import { Link } from 'react-router-dom'
import Restaurant from '../../models/Restaurant';
// @ts-ignore
import { Table, Tr } from 'styled-table-component';


export default class DisplayRestaurants extends Component<{ searchData: any }, {}> {

    render() {
        return (
            <div className="display-container">
                <Table theadLight>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Restaurant Name</th>
                            <th scope="col">Restaurant Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.searchData && this.props.searchData.map((item: Restaurant, key: number) => {
                            console.log(key)
                            return (
                                <tr key={key}>
                                    <th scope="row">{key + 1}</th>
                                    <td>
                                        <Link to={{
                                            pathname: "/reservation",
                                            state: {
                                                data: item
                                            }
                                        }}>{item.name}</Link>
                                    </td>
                                    <td>{item.city}, {item.zip}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}