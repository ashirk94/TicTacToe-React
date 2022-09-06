import './App.css'
import React, { Component } from 'react'

//squares as components version
function Square(props) {
	return (
		<div
			className={props.className}
			id={props.index}
			onClick={props.onClick}>
			{props.value}
		</div>
	)
}

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
			winner: null,
			winningLine: []
		}
		this.lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		]
		this.handleClick = this.handleClick.bind(this)
	}
	render() {
		let status
		if (this.state.winner) {
			status = 'Winner: ' + this.state.winner
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
		}

		const output = (
			<div>
				<div className='status'>{status}</div>
				<div className='board-row'>
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className='board-row'>
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className='board-row'>
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		)
		return output
	}
	renderSquare(i) {
		let className =
			this.state.squares[i] == null
				? 'square'
				: 'square-full'
                if (this.state.winningLine.includes(i)) {
                    className = 'square-winner'
                }
		const enabled =
			this.state.winner == null && this.state.squares[i] == null
				? true
				: false
		const eventHandler = enabled ? this.handleClick : () => {}
		const output = (
			<Square
				className={className}
				value={
					this.state.squares[i] != null ? this.state.squares[i] : ''
				}
				onClick={eventHandler}
				index={i}
			/>
		)
		return output
	}
	handleClick(event) {
		const id = event.target.id
		let squares = Object.assign({}, this.state.squares)
		squares[id] = this.state.xIsNext ? 'X' : 'O'
		const theWinner = this.calculateWinner(squares)
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext,
			winner: theWinner.player,
            winningLine: theWinner.winningLine
		})
	}
	calculateWinner(squares) {
		for (let i = 0; i < this.lines.length; i++) {
			const [a, b, c] = this.lines[i]
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return {
					player: squares[a],
					winningLine: this.lines[i]
				}
			}
		}

		return {
			player: null,
			winningLine: []
		}
	}
}

export default App
