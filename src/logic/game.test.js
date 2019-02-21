import Game from './game';

describe('Game', () => {
	it('should store moves correctly', () => {
		const game = new Game();

		game.StoreMove('x', 0, 0);
		expect(game.state[0][0]).toBe('x');

		game.StoreMove('o', 2, 1);
		expect(game.state[2][1]).toBe('o');
	});
	it('should not store invalid moves', () => {
		const game = new Game();

		expect(() => {
			game.StoreMove('y', 0, 0);
		}).toThrow();

		expect(() => {
			game.StoreMove('o', 13, 21);
		}).toThrow();
	});
});
