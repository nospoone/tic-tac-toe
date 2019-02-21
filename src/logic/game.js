export default class Game {
	constructor() {
		this.emptyBoard = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];

		this.boardHistoryKey = 'naughts-and-crosses__history';
		this.board = this.emptyBoard;
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
		const serializedBoard = JSON.stringify(this.board);
		localStorage.setItem(this.boardHistoryKey, serializedBoard);
		return serializedBoard;
	}
}
