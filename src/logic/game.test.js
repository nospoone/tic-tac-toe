import Game from './game';

describe('Game', () => {
	it('should store moves correctly', () => {
		const game = new Game();
		game.storeMove('x', 0, 0);
		expect(game.board[0][0]).toBe('x');
		game.storeMove('o', 2, 1);
		expect(game.board[1][2]).toBe('o');
	});
	it('should not store invalid moves', () => {
		const game = new Game();
		expect(() => {
			game.storeMove('y', 0, 0);
		}).toThrow('Invalid player.');
		expect(() => {
			game.storeMove('o', 13, 21);
		}).toThrow('Move position out of bounds.');
	});
});
