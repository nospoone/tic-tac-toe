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

	describe('Serialization', () => {
		const board = [
			['x', null, 'o'],
			[null, 'x', 'o'],
			[null, null, 'x']
		];
		const serializedBoard = JSON.stringify(board);

		beforeEach(() => {
			game.board = board;
		});

		it('should correctly serialize the board state', () => {
			const serializedBoard = game.serialize();
			expect(serializedBoard).toBe(serializedBoard);
		});
		it('should correctly serialize the board state to localStorage', () => {
			game.serialize();
			expect(localStorage.__STORE__[game.boardHistoryKey]).toBe(serializedBoard);
		});
		it('should correctly deserialize the board state from localStorage', () => {
			game.deserialize();
			expect(game.board).toBe(board);
		});
	});
});
