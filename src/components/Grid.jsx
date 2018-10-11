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

<<<<<<< HEAD
    board = [...Array(this.state.width * this.state.height)];
    children = [...Array(this.state.width * this.state.height)];
=======
    board
>>>>>>> dad111a... refactored cell generation

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
<<<<<<< HEAD
=======
                //if (this.state.board[y * this.state.width + x] === 9)
                //continue;

>>>>>>> dad111a... refactored cell generation
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

                let idx = y * this.state.width + x;

<<<<<<< HEAD
                const idx = y * this.state.width + x;

                this.board[idx] = this.board[idx] === 9 ? 9 : count;
                this.children[idx] = <Cell key={idx} bombs={count} />
=======
                this.state.board[idx] = this.state.board[idx] === 9 ? 9 : count;
<<<<<<< HEAD
<<<<<<< HEAD
                this.state.cells[idx] = <Cell key={idx} bombs={this.state.board[idx]} />
>>>>>>> dad111a... refactored cell generation
=======
                this.state.cells[idx] = <Cell reveal={this.reveal} onRef={ref => (this.state.references[idx] = ref)} key={idx} bombs={this.state.board[idx]} />
>>>>>>> 8347533... added flagging mechanism
=======
                this.state.flagged[idx] = false;
                this.state.cells[idx] = <Cell id={idx} reveal={this.reveal} onRef={ref => (this.state.references[idx] = ref)} key={idx} bombs={this.state.board[idx]} />
>>>>>>> edf27f8... added reveal on number click
            }
        }
    }

    handleClick = () => {
        for (let c of this.state.references) {
            //console.log(c);
            //c.handleClick();
        }
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

        count += (this.state.references[topleftIdx].flagged()) * (topleftIdx !== -1);
        count += (this.state.references[topIdx].flagged()) * (topIdx !== -1);
        count += (this.state.references[topRightIdx].flagged()) * (topRightIdx !== -1);
        count += (this.state.references[rightIdx].flagged()) * (rightIdx !== -1);
        count += (this.state.references[bottomRightIdx].flagged()) * (bottomRightIdx !== -1);
        count += (this.state.references[bottomIdx].flagged()) * (bottomIdx !== -1);
        count += (this.state.references[bottomLeftIdx].flagged()) * (bottomLeftIdx !== -1);
        count += (this.state.references[leftIdx].flagged()) * (leftIdx !== -1);

        if (this.state.board[id] === count) {
            this.state.references[topleftIdx].reveal();
            this.state.references[topIdx].reveal();
            this.state.references[topRightIdx].reveal();
            this.state.references[rightIdx].reveal();
            this.state.references[bottomRightIdx].reveal();
            this.state.references[bottomIdx].reveal();
            this.state.references[bottomLeftIdx].reveal();
            this.state.references[leftIdx].reveal();
        }
    }

    render() {
<<<<<<< HEAD
        const gridStyle = {
            "grid-template-columns": "auto ".repeat(this.state.width)
        };

        return <div style={gridStyle} className="grid" onClick={this.handleClick}>{this.children}</div>
=======
        const divstyle = {
            gridTemplateColumns: 'auto '.repeat(this.state.width),
        };
<<<<<<< HEAD
        return <div style={divstyle} className="grid" >{this.state.cells}</div>;
>>>>>>> dad111a... refactored cell generation
=======
        return <div style={divstyle} onClick={this.handleClick} className="grid" >{this.state.cells}</div>;
>>>>>>> 8347533... added flagging mechanism
    }
}

export default Grid;