import React, { Component } from 'react'
import axios from 'axios';
export default class Data extends Component {

    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }

    componentWillUpdate(){
        
    }
    render() {
        return (
            <div>
                <h1>data</h1>
            </div>
        )
    }
}
