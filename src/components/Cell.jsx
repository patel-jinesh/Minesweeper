import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
    state = {
        revealed: false,
        bombs: 0
    };

    render() {
        const c = [``, ` one`, ` two`, ` three`, ` four`, ` five`, ` six`, ` seven`, ` eight`, ``];
        if (!this.state.revealed)
            return <div className="Cell" onClick={this.handleClick}><p>{this.props.bombs}</p></div>;

        return <div className={`revealed` + c[this.props.bombs]} onClick={this.handleClick}><p>{this.props.bombs}</p></div>;
    }

    handleClick = () => {
        this.setState({ revealed: true });
    }
}

export default Cell;