import React, {Component} from 'react';
import './App.css';

import Title from '../Title/Title';
import Square from '../Square/Square';
import Button from '../Button/Button';
import TurnIndicator from '../TurnIndicator/TurnIndicator';
import Game from '../../logic/Game';

class App extends Component {
	constructor(props) {
		super(props);
		this.game = new Game();
		this.state = {
			player: 'x',
			board: JSON.parse(JSON.stringify(this.game.board)),
			finished: false
		};
		this.handleSquareClick = this.handleSquareClick.bind(this);
		this.handleUndoClick = this.handleUndoClick.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
	}

	handleSquareClick(x, y) {
		if (this.game.board[y][x] === null) {
			const finished = this.game.storeMove(this.state.player, x, y);
			this.setState(prevState => {
				return {
					player: prevState.player === 'x' ? 'o' : 'x',
					board: JSON.parse(JSON.stringify(this.game.board)),
					finished
				};
			});
		}
	}

	handleUndoClick() {
		if (this.game.historyCursor > 0) {
			this.game.undo();
			this.setState(prevState => {
				return {
					player: prevState.player === 'x' ? 'o' : 'x',
					board: JSON.parse(JSON.stringify(this.game.board)),
					finished: false
				};
			});
		}
	}

	handleResetClick() {
		if (this.game.historyCursor > 0) {
			this.game.reset();
			this.setState({
				player: 'x',
				board: JSON.parse(JSON.stringify(this.game.board)),
				finished: false
			});
		}
	}

	render() {
		return (
			<>
				<Title/>
				{[0, 1, 2].map(y => {
					return (
						<div key={y} className="row" data-row={y}>
							{[0, 1, 2].map(x => {
								return (
									<Square
										key={`${x}:${y}`}
										x={x}
										y={y}
										mark={this.state.board[y][x]}
										onClick={this.handleSquareClick}
									/>
								);
							})}
						</div>
					);
				})}
				<div className="status">
					<div className="button-container">
						<Button disabled={this.game.historyCursor === 0} color="orange" onClick={this.handleUndoClick}>Undo</Button>
						<Button disabled={this.game.historyCursor === 0} color="red" onClick={this.handleResetClick}>Reset</Button>
					</div>
					<TurnIndicator finished={this.state.finished !== false} player={this.state.finished === false ? this.state.player : this.state.finished}/>
				</div>
			</>
		);
	}
}

export default App;
