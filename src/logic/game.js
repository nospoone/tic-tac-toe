export default class Game {
	constructor() {
		this.emptyBoard = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
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
	}

	serialize() {
		const serializedHistory = JSON.stringify(this.history);
		localStorage.setItem(this.boardHistoryKey, serializedHistory);
		return serializedHistory;
	}

	deserialize() {
		const deserializedHistory = JSON.parse(localStorage.getItem(this.boardHistoryKey));
		this.history = deserializedHistory;
		this.board = deserializedHistory[deserializedHistory.length - 1];
		return deserializedHistory;
	}

	reset() {
		this.history = [this.emptyBoard];
		this.historyCursor = 0;
		this.board = this.emptyBoard;
	}

	undo() {
		this.historyCursor--;
		this.board = this.history[this.historyCursor];
	}

	solve(board, x, y) {

	}
}
