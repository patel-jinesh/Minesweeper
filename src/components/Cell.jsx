import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
    state = {
        revealed: false,
        flagged: false
    };

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        const c = [``, ` one`, ` two`, ` three`, ` four`, ` five`, ` six`, ` seven`, ` eight`, ` bomb`];

        let className = ``;

        if (!this.state.revealed && this.state.flagged)
            className = `flagged`;
        else if (!this.state.revealed)
            className = `Cell`;
        else
            className = `revealed` + c[this.props.bombs];

        if (this.props.bombs === 9)
            return <div className={className} onClick={this.handleClick} onContextMenu={(e) => { e.preventDefault(); this.handleRightClick(); }}><p></p></div>;


        return <div className={className} onClick={this.handleClick} onContextMenu={(e) => { e.preventDefault(); this.handleRightClick(); }}><p>{this.props.bombs}</p></div>;
    }

    handleClick = () => {
        this.reveal();
        if (this.state.revealed)
            this.props.reveal(this.props.id);
    }

    reveal = () => {
        if (!this.state.flagged)
            this.setState({ revealed: true }, this.changed);
        if (this.props.bombs === 9)
            this.props.gameOver();
    }

    changed = () => {
        if (this.props.bombs === 0) {
            this.props.reveal(this.props.id);
        }
    }

    flagged = () => {
        return this.state.flagged;
    }

    revealed = () => {
        return this.state.revealed;
    }

    handleRightClick = () => {
        if (!this.state.revealed) {
            this.setState({ flagged: !this.state.flagged });
        }
    }
}

export default Cell;