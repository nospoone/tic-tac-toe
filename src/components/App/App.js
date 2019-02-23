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
			player: 'x'
		};
		this.handleSquareClick = this.handleSquareClick.bind(this);
	}

	handleSquareClick(x, y) {
		if (this.game.board[y][x] === null) {
			this.game.storeMove(this.state.player, x, y);
			this.setState(prevState => {
				return {
					player: prevState.player === 'x' ? 'o' : 'x'
				};
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
										mark={this.game.board[y][x]}
										onClick={this.handleSquareClick}
									/>
								);
							})}
						</div>
					);
				})}
				<div className="status">
					<div className="button-container">
						<Button disabled={this.game.historyCursor === 0} color="orange">Undo</Button>
						<Button disabled={this.game.historyCursor === 0} color="red">Reset</Button>
					</div>
					<TurnIndicator finished player="x"/>
				</div>
			</>
		);
	}
}

export default App;
