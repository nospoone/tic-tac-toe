import Game from './game';

describe('Game', () => {
	let game;

	beforeEach(() => {
		game = new Game();
	});

	describe('Moves', () => {
		it('should store moves correctly', () => {
			game.storeMove('x', 0, 0);
			expect(game.board[0][0]).toBe('x');
			game.storeMove('o', 2, 1);
			expect(game.board[1][2]).toBe('o');
		});
		it('should not store invalid moves', () => {
			expect(() => {
				game.storeMove('y', 0, 0);
			}).toThrow('Invalid player.');
			expect(() => {
				game.storeMove('o', 13, 21);
			}).toThrow('Move position out of bounds.');
		});
	});

	describe('Serialization & History', () => {
		const history = [
			[[null, null, null], [null, null, null], [null, null, null]],
			[[null, null, null], [null, null, null], [null, null, 'x']],
			[[null, null, null], [null, null, null], [null, null, 'x']],
			[['x', null, null], [null, 'x', null], [null, null, 'x']],
			[['x', null, null], ['x', 'x', null], [null, null, 'x']],
			[['x', null, null], ['x', 'x', null], ['x', null, 'x']],
			[['x', null, null], ['x', 'x', null], ['x', 'x', 'x']],
			[['x', 'x', null], ['x', 'x', null], ['x', 'x', 'x']],
			[['x', 'x', 'x'], ['x', 'x', null], ['x', 'x', 'x']],
			[['x', 'x', 'x'], ['x', 'x', 'x'], ['x', 'x', 'x']]
		];
		const serializedHistory = JSON.stringify(history);
		const emptyBoard = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];

		beforeEach(() => {
			game.history = history;
			game.historyCursor = history.length - 1;
			game.board = history[history.length - 1];
		});

		it('should correctly serialize the board history', () => {
			const serializedHistoryFromGame = game.serialize();
			expect(serializedHistoryFromGame).toEqual(serializedHistory);
		});
		it('should correctly serialize the board history to localStorage', () => {
			game.serialize();
			expect(localStorage.__STORE__[game.boardHistoryKey]).toEqual(serializedHistory);
		});
		it('should correctly deserialize the board history from localStorage', () => {
			game.deserialize();
			expect(game.history).toEqual(history);
			expect(game.board).toEqual(history[history.length - 1]);
		});

		it('should correctly reset the board state', () => {
			game.reset();
			expect(game.board).toEqual(emptyBoard);
			expect(game.history).toEqual([emptyBoard]);
			expect(game.historyCursor).toBe(0);
		});

		it('should correctly undo the board state to the beginning', () => {
			for (let i = 0; i < history.length - 1; i++) {
				game.undo();
			}

			expect(game.board).toEqual(emptyBoard);
		});
	});
});
