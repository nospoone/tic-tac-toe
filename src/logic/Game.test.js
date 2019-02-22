import Game from './Game';

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
		it('should find all winning possiblities', () => {
			const boards = [
				{player: 'x', x: 0, y: 0, board: [['x', 'x', 'x'], [null, null, null], [null, null, null]]},
				{player: 'x', x: 0, y: 1, board: [[null, null, null], ['x', 'x', 'x'], [null, null, null]]},
				{player: 'x', x: 0, y: 2, board: [[null, null, null], [null, null, null], ['x', 'x', 'x']]},
				{player: 'x', x: 0, y: 0, board: [['x', null, null], ['x', null, null], ['x', null, null]]},
				{player: 'x', x: 1, y: 0, board: [[null, 'x', null], [null, 'x', null], [null, 'x', null]]},
				{player: 'x', x: 2, y: 0, board: [[null, null, 'x'], [null, null, 'x'], [null, null, 'x']]},
				{player: 'x', x: 0, y: 0, board: [['x', null, null], [null, 'x', null], [null, null, 'x']]},
				{player: 'x', x: 2, y: 0, board: [[null, null, 'x'], [null, 'x', null], ['x', null, null]]},
				{player: 'o', x: 0, y: 0, board: [['o', 'o', 'o'], [null, null, null], [null, null, null]]},
				{player: 'o', x: 0, y: 1, board: [[null, null, null], ['o', 'o', 'o'], [null, null, null]]},
				{player: 'o', x: 0, y: 2, board: [[null, null, null], [null, null, null], ['o', 'o', 'o']]},
				{player: 'o', x: 0, y: 0, board: [['o', null, null], ['o', null, null], ['o', null, null]]},
				{player: 'o', x: 1, y: 0, board: [[null, 'o', null], [null, 'o', null], [null, 'o', null]]},
				{player: 'o', x: 2, y: 0, board: [[null, null, 'o'], [null, null, 'o'], [null, null, 'o']]},
				{player: 'o', x: 0, y: 0, board: [['o', null, null], [null, 'o', null], [null, null, 'o']]},
				{player: 'o', x: 2, y: 0, board: [[null, null, 'o'], [null, 'o', null], ['o', null, null]]}
			];

			boards.forEach(board => {
				expect(game.solve(board.board, board.x, board.y)).toBe(board.player);
			});
		});
		it('should find draws', () => {
			const boards = [
				{player: 'x', x: 0, y: 0, board: [['x', 'o', 'o'], ['o', 'x', 'x'], ['x', 'x', 'o']]},
				{player: 'x', x: 0, y: 0, board: [['x', 'x', 'o'], ['o', 'o', 'x'], ['x', 'o', 'x']]},
				{player: 'x', x: 0, y: 0, board: [['x', 'x', 'o'], ['o', 'o', 'x'], ['x', 'x', 'o']]}
			];

			boards.forEach(board => {
				expect(game.solve(board.board, board.x, board.y)).toBe(false);
			});
		});
	});

	describe('Serialization & History', () => {
		const history = [
			[[null, null, null], [null, null, null], [null, null, null]],
			[[null, null, null], [null, null, null], [null, null, 'x']],
			[['x', null, null], [null, 'x', null], [null, null, 'x']],
			[['x', null, null], ['x', 'x', null], [null, null, 'x']],
			[['x', null, null], ['x', 'x', null], ['x', null, 'x']],
			[['x', null, null], ['x', 'x', null], ['x', 'x', 'x']],
			[['x', 'x', null], ['x', 'x', null], ['x', 'x', 'x']],
			[['x', 'x', 'x'], ['x', 'x', null], ['x', 'x', 'x']],
			[['x', 'x', 'x'], ['x', 'x', 'x'], ['x', 'x', 'x']]
		];
		const emptyHistory = [
			[[null, null, null], [null, null, null], [null, null, null]]
		];
		const emptyBoard = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
		const serializedHistory = JSON.stringify({history, historyCursor: history.length - 1});

		beforeEach(() => {
			game.history = history;
			game.historyCursor = history.length - 1;
			game.board = history[history.length - 1];
			game.serialize();
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
			expect(game.board).toEqual(history[history.length - 1]);
			expect(game.history).toEqual(history);
			expect(game.historyCursor).toEqual(history.length - 1);
		});
		it('should correctly reset the board state', () => {
			game.reset();
			expect(game.board).toEqual(emptyBoard);
			expect(game.history).toEqual([emptyBoard]);
			expect(game.historyCursor).toBe(0);
			expect(localStorage.__STORE__[game.boardHistoryKey]).toBeUndefined();
		});
		it('should correctly undo the board state to the beginning', () => {
			for (let i = 0; i < history.length - 1; i++) {
				game.undo();
			}

			expect(game.board).toEqual(emptyBoard);
			expect(game.history).toEqual(emptyHistory);
			expect(game.historyCursor).toBe(0);
		});
		it('should correctly set the historyPointer when `storeMove` is called', () => {
			game.reset();
			game.storeMove('x', 0, 0);
			expect(game.historyCursor).toBe(1);
			game.storeMove('o', 0, 1);
			expect(game.historyCursor).toBe(2);
		});
		it('should correctly serialize the history when `storeMove` is called', () => {
			game.reset();
			game.storeMove('x', 0, 0);
			const expectedSerializedHistory = JSON.stringify([[['x', null, null], [null, null, null], [null, null, null]]]);
			expect(localStorage.__STORE__[game.boardHistoryKey]).toEqual(expectedSerializedHistory);
		});
		it('should correctly serialize the history when multiple `storeMove`s are called', () => {
			game.reset();
			game.storeMove('x', 0, 0);
			game.storeMove('o', 0, 1);
			game.storeMove('x', 0, 2);
			const expectedSerializedHistory = JSON.stringify({
				history: [
					[[null, null, null], [null, null, null], [null, null, null]],
					[['x', null, null], [null, null, null], [null, null, null]],
					[['x', 'o', null], [null, null, null], [null, null, null]],
					[['x', 'o', 'x'], [null, null, null], [null, null, null]]
				],
				historyCursor: 3
			});
			expect(localStorage.__STORE__[game.boardHistoryKey]).toEqual(expectedSerializedHistory);
		});
	});
});
