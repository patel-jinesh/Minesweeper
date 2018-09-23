import React, { Component } from 'react';
import Cell from './Cell';
import './Grid.css'

class Grid extends Component {
    state = {
        width: 30,
        height: 15,
        bombCount: 100
    };

    board = [...Array(this.state.width * this.state.height)];

    constructor() {
        super();
        let bombsRemaining = this.state.bombCount;
        while (bombsRemaining) {
            let row = Math.floor((Math.random() * this.state.width));
            let col = Math.floor((Math.random() * this.state.height));

            let index = row * this.state.width + col;

            if (this.board[index] !== 9) {
                this.board[index] = 9;
                bombsRemaining--;
            }
        }

        let x, y;
        for (y = 0; y < this.state.height; y++) {
            for (x = 0; x < this.state.width; x++) {
                if (this.board[y * this.state.width + x] === 9)
                    continue;

                let topleftIdx = x === 0 || y === 0 ? -1 : (y - 1) * this.state.width + x - 1;
                let topIdx = y === 0 ? -1 : (y - 1) * this.state.width + x;
                let topRightIdx = x === this.state.width - 1 || y === 0 ? -1 : (y - 1) * this.state.width + x + 1;
                let rightIdx = x === this.state.width - 1 ? -1 : y * this.state.width + x + 1;
                let bottomRightIdx = x === this.state.width - 1 || y === this.state.height - 1 ? - 1 : (y + 1) * this.state.width + x + 1;
                let bottomIdx = y === this.state.height - 1 ? - 1 : (y + 1) * this.state.width + x;
                let bottomLeftIdx = x === 0 || y === this.state.height - 1 ? - 1 : (y + 1) * this.state.width + x - 1;
                let leftIdx = x === 0 ? -1 : y * this.state.width + x - 1;

                let count = 0;

                count += (this.board[topleftIdx] === 9) * (topleftIdx !== -1)
                count += (this.board[topIdx] === 9) * (topIdx !== -1)
                count += (this.board[topRightIdx] === 9) * (topRightIdx !== -1)
                count += (this.board[rightIdx] === 9) * (rightIdx !== -1)
                count += (this.board[bottomRightIdx] === 9) * (bottomRightIdx !== -1)
                count += (this.board[bottomIdx] === 9) * (bottomIdx !== -1)
                count += (this.board[bottomLeftIdx] === 9) * (bottomLeftIdx !== -1)
                count += (this.board[leftIdx] === 9) * (leftIdx !== -1)

                this.board[y * this.state.width + x] = count;
            }
        }
    }

    render() {
        const ids = [];
        let w, h;
        for (h = 0; h < this.state.height; h++) {
            ids.push([]);
            for (w = 0; w < this.state.width; w++) {
                ids[h].push(h * this.state.width + w);
            }
        }
        console.log(this.board);
        return <div className="grid" onClick={this.handleClick}>{ids.map((row) =>
            <div className="row" key={row[0]} >{row.map((id) =>
                < Cell key={id} bombs={this.board[id]} />
            )
            }</div>)
        }</div>;
    }
}

export default Grid;