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

        if (!this.state.revealed && this.state.flagged)
            return <div className="flagged" onClick={this.handleClick} onContextMenu={(e) => { e.preventDefault(); this.handleRightClick(); }}><p>{this.props.bombs}</p></div>;
        if (!this.state.revealed)
            return <div className="Cell" onClick={this.handleClick} onContextMenu={(e) => { e.preventDefault(); this.handleRightClick(); }}><p>{this.props.bombs}</p></div>;

        return <div className={`revealed` + c[this.props.bombs]} onClick={this.handleClick} onContextMenu={(e) => { e.preventDefault(); this.handleRightClick(); }}><p>{this.props.bombs}</p></div>;
    }

    handleClick = () => {
<<<<<<< HEAD
        if (this.props.bombs === 9)
            alert("You lose.");
        this.setState({ revealed: true });
=======
        if (!this.state.flagged)
            this.setState({ revealed: true });
    }

    handleRightClick = () => {
        if (!this.state.revealed) {
            this.setState({ flagged: !this.state.flagged });
        } else {
            this.props.reveal();
        }
>>>>>>> 8347533... added flagging mechanism
    }
}

export default Cell;