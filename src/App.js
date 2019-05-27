import React, { Component } from 'react';
import threeEntryPoint from './threejs/threeEntryPoint';
export default class ThreeContainer extends Component {
    componentDidMount() {
        threeEntryPoint(this.threeRootElement);
    }
    render () {
        return (
            <div
                style={{height: '100vh', width: '100%', backgroundColor: '#C0C0C0'}}
                ref={element => this.threeRootElement = element} />
        );
    }
}