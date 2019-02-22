export default class Game {
	constructor() {
		this.boardHistoryKey = 'naughts-and-crosses__history';
		this.reset();
	}

	storeMove(player, x, y) {
		if (x > 2 || y > 2) {
			throw new Error('Move position out of bounds.');
		}

		if (player !== 'x' && player !== 'o') {
			throw new Error('Invalid player.');
		}

		this.board[y][x] = player;
		this.history.push(JSON.parse(JSON.stringify(this.board)));
		this.historyCursor++;
		this.serialize();
	}

	serialize() {
		const serializedHistory = JSON.stringify({
			history: this.history,
			historyCursor: this.historyCursor
		});
		localStorage.setItem(this.boardHistoryKey, serializedHistory);
		return serializedHistory;
	}

	deserialize() {
		const deserializedHistory = JSON.parse(localStorage.getItem(this.boardHistoryKey));
		this.board = deserializedHistory.history[deserializedHistory.history.length - 1];
		this.history = deserializedHistory.history;
		this.historyCursor = deserializedHistory.historyCursor;
		return deserializedHistory;
	}

	reset() {
		this.board = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
		this.history = [[
			[null, null, null],
			[null, null, null],
			[null, null, null]
		]];
		this.historyCursor = 0;
		localStorage.removeItem(this.boardHistoryKey);
	}

	undo() {
		this.historyCursor--;
		this.board = JSON.parse(JSON.stringify(this.history[this.historyCursor]));
		this.history.splice(-1, 1);
	}

	solve(board, x, y) {
		const player = board[y][x];
		const counts = {
			column: 0,
			row: 0,
			diagonal: 0,
			reverseDiagonal: 0
		};

		for (let i = 0; i < 3; i++) {
			if (board[i][x] === player) {
				counts.column++;
			}

			if (board[y][i] === player) {
				counts.row++;
			}

			if (board[i][i] === player) {
				counts.diagonal++;
			}

			if (board[3 - (i + 1)][i] === player) {
				counts.reverseDiagonal++;
			}
		}

		if (counts.column === 3 || counts.row === 3 || counts.diagonal === 3 || counts.reverseDiagonal === 3) {
			return player;
		}

		return false;
	}
}
