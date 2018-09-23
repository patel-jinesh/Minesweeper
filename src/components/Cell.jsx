import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
    state = {
        revealed: false,
        bombs: 0
    };

    render() {
        return <div className="Cell"></div>;
    }
}

export default Cell;