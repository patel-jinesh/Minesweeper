import React, { Component } from 'react';
import Cell from './Cell';
import './Grid.css'

class Grid extends Component {
    state = {
        width: 30,
        height: 15
    };

    render() {
        const ids = [];
        let w, h;
        for (h = 0; h < this.state.height; h++) {
            ids.push([]);
            for (w = 0; w < this.state.width; w++) {
                ids[h].push(h * this.state.width + w);
            }
        }
        console.log(ids);
        return <div>{ids.map((row) => <div className="row" key={row[0]} > {row.map((id) => <Cell key={id} />)}</div>)}</div>;
    }
}

export default Grid;