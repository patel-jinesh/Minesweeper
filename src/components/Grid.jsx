import React, { Component } from 'react';
import Cell from './Cell';
import './Grid.css'

class Grid extends Component {
    state = {
        width: 30,
        height: 15,
        bombCount: 100,
        board: [],
        cells: [],
        references: [],
        flagged: []
    };

    constructor() {
        super();

        this.state.board = [...Array(this.state.width * this.state.height)];
        this.state.cells = [...Array(this.state.width * this.state.height)];
        this.state.references = [...Array(this.state.width * this.state.height)];
        this.state.flagged = [...Array(this.state.width * this.state.height)];

        let bombsRemaining = this.state.bombCount;
        while (bombsRemaining) {
            let row = Math.floor((Math.random() * this.state.height));
            let col = Math.floor((Math.random() * this.state.width));

            let index = row * this.state.width + col;

            if (this.state.board[index] !== 9) {
                this.state.board[index] = 9;
                bombsRemaining--;
            }
        }

        let x, y;
        for (y = 0; y < this.state.height; y++) {
            for (x = 0; x < this.state.width; x++) {
                //if (this.state.board[y * this.state.width + x] === 9)
                //continue;

                let topleftIdx = x === 0 || y === 0 ? -1 : (y - 1) * this.state.width + x - 1;
                let topIdx = y === 0 ? -1 : (y - 1) * this.state.width + x;
                let topRightIdx = x === this.state.width - 1 || y === 0 ? -1 : (y - 1) * this.state.width + x + 1;
                let rightIdx = x === this.state.width - 1 ? -1 : y * this.state.width + x + 1;
                let bottomRightIdx = x === this.state.width - 1 || y === this.state.height - 1 ? - 1 : (y + 1) * this.state.width + x + 1;
                let bottomIdx = y === this.state.height - 1 ? - 1 : (y + 1) * this.state.width + x;
                let bottomLeftIdx = x === 0 || y === this.state.height - 1 ? - 1 : (y + 1) * this.state.width + x - 1;
                let leftIdx = x === 0 ? -1 : y * this.state.width + x - 1;

                let count = 0;

                count += (this.state.board[topleftIdx] === 9) * (topleftIdx !== -1);
                count += (this.state.board[topIdx] === 9) * (topIdx !== -1);
                count += (this.state.board[topRightIdx] === 9) * (topRightIdx !== -1);
                count += (this.state.board[rightIdx] === 9) * (rightIdx !== -1);
                count += (this.state.board[bottomRightIdx] === 9) * (bottomRightIdx !== -1);
                count += (this.state.board[bottomIdx] === 9) * (bottomIdx !== -1);
                count += (this.state.board[bottomLeftIdx] === 9) * (bottomLeftIdx !== -1);
                count += (this.state.board[leftIdx] === 9) * (leftIdx !== -1);

                const idx = y * this.state.width + x;

                this.state.board[idx] = this.state.board[idx] === 9 ? 9 : count;
                this.state.flagged[idx] = false;
                this.state.cells[idx] = <Cell id={idx} gameOver={this.gameOver} reveal={this.reveal} onRef={ref => (this.state.references[idx] = ref)} key={idx} bombs={this.state.board[idx]} />
            }
        }
    }

    gameOver = () => {
        this.handleClick();
    }

    reveal = (id) => {
        let count = 0;

        let y = Math.floor(id / this.state.width);
        let x = id % this.state.width;

        let topleftIdx = x === 0 || y === 0 ? -1 : (y - 1) * this.state.width + x - 1;
        let topIdx = y === 0 ? -1 : (y - 1) * this.state.width + x;
        let topRightIdx = x === this.state.width - 1 || y === 0 ? -1 : (y - 1) * this.state.width + x + 1;
        let rightIdx = x === this.state.width - 1 ? -1 : y * this.state.width + x + 1;
        let bottomRightIdx = x === this.state.width - 1 || y === this.state.height - 1 ? - 1 : (y + 1) * this.state.width + x + 1;
        let bottomIdx = y === this.state.height - 1 ? - 1 : (y + 1) * this.state.width + x;
        let bottomLeftIdx = x === 0 || y === this.state.height - 1 ? - 1 : (y + 1) * this.state.width + x - 1;
        let leftIdx = x === 0 ? -1 : y * this.state.width + x - 1;

        count += (topleftIdx === -1) ? 0 : (this.state.references[topleftIdx].flagged());
        count += (topIdx === -1) ? 0 : (this.state.references[topIdx].flagged());
        count += (topRightIdx === -1) ? 0 : (this.state.references[topRightIdx].flagged());
        count += (rightIdx === -1) ? 0 : (this.state.references[rightIdx].flagged());
        count += (bottomRightIdx === -1) ? 0 : (this.state.references[bottomRightIdx].flagged());
        count += (bottomIdx === -1) ? 0 : (this.state.references[bottomIdx].flagged());
        count += (bottomLeftIdx === -1) ? 0 : (this.state.references[bottomLeftIdx].flagged());
        count += (leftIdx === -1) ? 0 : (this.state.references[leftIdx].flagged());

        if (this.state.board[id] === 0 || this.state.board[id] === count) {
            if (topleftIdx !== -1 && !this.state.references[topleftIdx].revealed())
                this.state.references[topleftIdx].reveal();
            if (topIdx !== -1 && !this.state.references[topIdx].revealed())
                this.state.references[topIdx].reveal();
            if (topRightIdx !== -1 && !this.state.references[topRightIdx].revealed())
                this.state.references[topRightIdx].reveal();
            if (rightIdx !== -1 && !this.state.references[rightIdx].revealed())
                this.state.references[rightIdx].reveal();
            if (bottomRightIdx !== -1 && !this.state.references[bottomRightIdx].revealed())
                this.state.references[bottomRightIdx].reveal();
            if (bottomIdx !== -1 && !this.state.references[bottomIdx].revealed())
                this.state.references[bottomIdx].reveal();
            if (bottomLeftIdx !== -1 && !this.state.references[bottomLeftIdx].revealed())
                this.state.references[bottomLeftIdx].reveal();
            if (leftIdx !== -1 && !this.state.references[leftIdx].revealed())
                this.state.references[leftIdx].reveal();
        }
    }

    handleClick = () => {
        this.id = setInterval(this.r, 0)
    }

    r = () => {
        if (this.idx === undefined)
            this.idx = 1;
        else
            this.idx += 1;

        if (this.idx === this.state.width * this.state.height) {
            clearInterval(this.id);
            return;
        }

        this.state.references[this.idx].setState({ revealed: true });
    }

    render() {
        const divstyle = {
            gridTemplateColumns: 'auto '.repeat(this.state.width),
        };
        return <div style={divstyle} className="grid" >{this.state.cells}</div>;
    }
}

export default Grid;