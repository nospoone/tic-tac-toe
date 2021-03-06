import React, {Fragment} from 'react';
import {shallow, mount} from 'enzyme';

import App from './App';
import Title from '../Title/Title';
import Square from '../Square/Square';
import Button from '../Button/Button';
import TurnIndicator from '../TurnIndicator/TurnIndicator';
import Game from '../../logic/Game';

describe('App', () => {
	it('should render a <Fragment /> as its root', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.at(0).is(Fragment)).toBe(true);
	});
	it('should contain a <Title/>', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.find(Title).length).toBe(1);
	});
	it('should contain three <div/> with the `row` class', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.find('div.row').length).toBe(3);
	});
	it('should contain nine <Square/>s inside three <div/> with the `row` class', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.find('div.row').length).toBe(3);
		wrapper.find('div.row').forEach(row => {
			expect(row.find(Square).length).toBe(3);
		});
	});
	it('should render a <div/> with the `status` class', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.find('div.status').length).toBe(1);
	});
	it('should render a <div/> with the `button-container` class, inside `div.status`', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.find('div.status div.button-container').length).toBe(1);
	});
	it('should render two <Button/>s inside a <div/> with the `button-container` class', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.find('div.button-container').find(Button).length).toBe(2);
	});
	it('should render a <TurnIndicator/> component inside a <div/> with the `status` class', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.find('div.status').find(TurnIndicator).length).toBe(1);
	});
	it('should contain a game member', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.instance().game).toBeInstanceOf(Game);
	});
	it('should store a move when calling `handleSquareClick`', () => {
		const wrapper = shallow(<App/>);
		wrapper.instance().handleSquareClick(0, 0);
		expect(wrapper.instance().game.board).toEqual([['x', null, null], [null, null, null], [null, null, null]]);
	});
	it('should not set the <Square/>\'s mark to `o` when clicking it a second time', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		expect(wrapper.instance().game.board).toEqual([['x', null, null], [null, null, null], [null, null, null]]);
	});
	it('should start with the X player as the active player', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.state('player')).toBe('x');
	});
	it('should set the O player as the active player on odd turns', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		expect(wrapper.state('player')).toBe('o');
		wrapper.find('div.row[data-row=0]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(2).simulate('click');
		expect(wrapper.state('player')).toBe('o');
		wrapper.find('div.row[data-row=1]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(1).simulate('click');
		expect(wrapper.state('player')).toBe('o');
		wrapper.find('div.row[data-row=1]').childAt(2).simulate('click');
		wrapper.find('div.row[data-row=2]').childAt(0).simulate('click');
		expect(wrapper.state('player')).toBe('o');
		wrapper.find('div.row[data-row=2]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=2]').childAt(2).simulate('click');
		expect(wrapper.state('player')).toBe('o');
	});
	it('should set the X player as the active player on even turns', () => {
		const wrapper = mount(<App/>);
		expect(wrapper.state('player')).toBe('x');
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(1).simulate('click');
		expect(wrapper.state('player')).toBe('x');
		wrapper.find('div.row[data-row=0]').childAt(2).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(0).simulate('click');
		expect(wrapper.state('player')).toBe('x');
		wrapper.find('div.row[data-row=1]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(2).simulate('click');
		expect(wrapper.state('player')).toBe('x');
	});
	it('should correctly set the board state when clicking a <Square/>', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		expect(wrapper.instance().game.historyCursor).toBe(1);
		expect(wrapper.instance().game.board).toEqual([['x', null, null], [null, null, null], [null, null, null]]);
	});
	it('should disable the undo <Button/> when there are no previous moves', () => {
		const wrapper = mount(<App/>);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(true);
	});
	it('should disable the reset <Button/> when there are no previous moves', () => {
		const wrapper = mount(<App/>);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(true);
	});
	it('should enable the undo <Button/> when there are previous moves', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
	});
	it('should enable the reset <Button/> when there are previous moves', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);
	});
	it('should rewind to the start of the game using the undo <Button/> when there are previous moves', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(2).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(2).simulate('click');
		wrapper.find('div.row[data-row=2]').childAt(0).simulate('click');

		for (let i = 0; i < 8; i++) {
			wrapper.find('div.button-container').childAt(0).simulate('click');
		}

		wrapper.update();
		expect(wrapper.state('player')).toBe('x');
		expect(wrapper.instance().game.board).toEqual([[null, null, null], [null, null, null], [null, null, null]]);
		expect(wrapper.instance().game.history).toEqual([[[null, null, null], [null, null, null], [null, null, null]]]);
		expect(wrapper.instance().game.historyCursor).toBe(0);
	});
	it('should rewind to the start of the game using the reset <Button/> when there are previous moves', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(2).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(2).simulate('click');
		wrapper.find('div.row[data-row=2]').childAt(0).simulate('click');

		wrapper.find('div.button-container').childAt(1).simulate('click');

		wrapper.update();
		expect(wrapper.state('player')).toBe('x');
		expect(wrapper.instance().game.board).toEqual([[null, null, null], [null, null, null], [null, null, null]]);
		expect(wrapper.instance().game.history).toEqual([[[null, null, null], [null, null, null], [null, null, null]]]);
		expect(wrapper.instance().game.historyCursor).toBe(0);
	});
	it('should disable the reset <Button/> when there are no previous moves', () => {
		const wrapper = mount(<App/>);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(true);
	});
	it('should set the `finished` prop on <TurnIndicator/> when the game is complete', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(2).simulate('click');

		wrapper.update();
		expect(wrapper.find('div.status').find(TurnIndicator).prop('finished')).toBe(true);
	});
	it('should set the `player` prop on <TurnIndicator/> correctly', () => {
		const wrapper = mount(<App/>);
		expect(wrapper.find('div.status').find(TurnIndicator).prop('player')).toBe('x');
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		wrapper.update();
		expect(wrapper.find('div.status').find(TurnIndicator).prop('player')).toBe('o');
		wrapper.find('div.row[data-row=1]').childAt(0).simulate('click');
		wrapper.update();
		expect(wrapper.find('div.status').find(TurnIndicator).prop('player')).toBe('x');
		wrapper.find('div.row[data-row=0]').childAt(1).simulate('click');
		wrapper.update();
		expect(wrapper.find('div.status').find(TurnIndicator).prop('player')).toBe('o');
		wrapper.find('div.row[data-row=1]').childAt(1).simulate('click');
		wrapper.update();
		expect(wrapper.find('div.status').find(TurnIndicator).prop('player')).toBe('x');
	});
	it('should set the `player` prop on <TurnIndicator/> correctly when the game is finished', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(2).simulate('click');
		wrapper.update();
		expect(wrapper.find('div.status').find(TurnIndicator).prop('player')).toBe('x');
	});
	it('should set the `disabled` prop on all <Square/> components when the game is finished', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=1]').childAt(1).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(2).simulate('click');
		wrapper.update();

		wrapper.find(Square).forEach(squareWrapper => {
			expect(squareWrapper.prop('disabled')).toBe(true);
		});
	});
	it('should be able to play through a whole game', () => {
		const wrapper = mount(<App/>);

		expect(wrapper.state('player')).toBe('x');
		expect(wrapper.state('finished')).toBe(false);
		expect(wrapper.state('board')).toEqual([[null, null, null], [null, null, null], [null, null, null]]);
		expect(wrapper.find('div.status').find(TurnIndicator).prop('player')).toBe('x');
		expect(wrapper.instance().game.board).toEqual([[null, null, null], [null, null, null], [null, null, null]]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(0);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(true);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(true);

		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('o');
		expect(wrapper.state('board')).toEqual([['x', null, null], [null, null, null], [null, null, null]]);
		expect(wrapper.instance().game.board).toEqual([['x', null, null], [null, null, null], [null, null, null]]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]],
			[['x', null, null], [null, null, null], [null, null, null]]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(1);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);

		wrapper.find('div.row[data-row=0]').childAt(1).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('x');
		expect(wrapper.state('board')).toEqual([['x', 'o', null], [null, null, null], [null, null, null]]);
		expect(wrapper.instance().game.board).toEqual([['x', 'o', null], [null, null, null], [null, null, null]]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]],
			[['x', null, null], [null, null, null], [null, null, null]],
			[['x', 'o', null], [null, null, null], [null, null, null]]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(2);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);

		wrapper.find('div.row[data-row=2]').childAt(2).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('o');
		expect(wrapper.state('board')).toEqual([['x', 'o', null], [null, null, null], [null, null, 'x']]);
		expect(wrapper.instance().game.board).toEqual([['x', 'o', null], [null, null, null], [null, null, 'x']]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]],
			[['x', null, null], [null, null, null], [null, null, null]],
			[['x', 'o', null], [null, null, null], [null, null, null]],
			[['x', 'o', null], [null, null, null], [null, null, 'x']]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(3);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);

		// Trigger Undo
		wrapper.find('div.button-container').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=0]').childAt(2).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('o');
		expect(wrapper.state('board')).toEqual([['x', 'o', 'x'], [null, null, null], [null, null, null]]);
		expect(wrapper.instance().game.board).toEqual([['x', 'o', 'x'], [null, null, null], [null, null, null]]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]],
			[['x', null, null], [null, null, null], [null, null, null]],
			[['x', 'o', null], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], [null, null, null], [null, null, null]]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(3);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);

		wrapper.find('div.row[data-row=1]').childAt(0).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('x');
		expect(wrapper.state('board')).toEqual([['x', 'o', 'x'], ['o', null, null], [null, null, null]]);
		expect(wrapper.instance().game.board).toEqual([['x', 'o', 'x'], ['o', null, null], [null, null, null]]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]],
			[['x', null, null], [null, null, null], [null, null, null]],
			[['x', 'o', null], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', null, null], [null, null, null]]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(4);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);

		wrapper.find('div.row[data-row=1]').childAt(1).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('o');
		expect(wrapper.state('board')).toEqual([['x', 'o', 'x'], ['o', 'x', null], [null, null, null]]);
		expect(wrapper.instance().game.board).toEqual([['x', 'o', 'x'], ['o', 'x', null], [null, null, null]]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]],
			[['x', null, null], [null, null, null], [null, null, null]],
			[['x', 'o', null], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', null], [null, null, null]]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(5);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);

		wrapper.find('div.row[data-row=1]').childAt(2).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('x');
		expect(wrapper.state('board')).toEqual([['x', 'o', 'x'], ['o', 'x', 'o'], [null, null, null]]);
		expect(wrapper.instance().game.board).toEqual([['x', 'o', 'x'], ['o', 'x', 'o'], [null, null, null]]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]],
			[['x', null, null], [null, null, null], [null, null, null]],
			[['x', 'o', null], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', null], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', 'o'], [null, null, null]]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(6);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);

		wrapper.find('div.row[data-row=2]').childAt(1).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('o');
		expect(wrapper.state('board')).toEqual([['x', 'o', 'x'], ['o', 'x', 'o'], [null, 'x', null]]);
		expect(wrapper.instance().game.board).toEqual([['x', 'o', 'x'], ['o', 'x', 'o'], [null, 'x', null]]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]],
			[['x', null, null], [null, null, null], [null, null, null]],
			[['x', 'o', null], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', null], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', 'o'], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', 'o'], [null, 'x', null]]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(7);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);

		wrapper.find('div.row[data-row=2]').childAt(0).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('x');
		expect(wrapper.state('board')).toEqual([['x', 'o', 'x'], ['o', 'x', 'o'], ['o', 'x', null]]);
		expect(wrapper.instance().game.board).toEqual([['x', 'o', 'x'], ['o', 'x', 'o'], ['o', 'x', null]]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]],
			[['x', null, null], [null, null, null], [null, null, null]],
			[['x', 'o', null], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', null], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', 'o'], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', 'o'], [null, 'x', null]],
			[['x', 'o', 'x'], ['o', 'x', 'o'], ['o', 'x', null]]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(8);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);

		wrapper.find('div.row[data-row=2]').childAt(2).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('o');
		expect(wrapper.state('board')).toEqual([['x', 'o', 'x'], ['o', 'x', 'o'], ['o', 'x', 'x']]);
		expect(wrapper.instance().game.board).toEqual([['x', 'o', 'x'], ['o', 'x', 'o'], ['o', 'x', 'x']]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]],
			[['x', null, null], [null, null, null], [null, null, null]],
			[['x', 'o', null], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], [null, null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', null, null], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', null], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', 'o'], [null, null, null]],
			[['x', 'o', 'x'], ['o', 'x', 'o'], [null, 'x', null]],
			[['x', 'o', 'x'], ['o', 'x', 'o'], ['o', 'x', null]],
			[['x', 'o', 'x'], ['o', 'x', 'o'], ['o', 'x', 'x']]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(9);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(false);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(false);
		expect(wrapper.state('finished')).toBe('x');
		expect(wrapper.find('div.status').find(TurnIndicator).prop('finished')).toBe(true);
		expect(wrapper.find('div.status').find(TurnIndicator).prop('player')).toBe('x');
		wrapper.find(Square).forEach(squareWrapper => {
			expect(squareWrapper.prop('disabled')).toBe(true);
		});

		wrapper.find('div.button-container').childAt(1).simulate('click');
		wrapper.update();

		expect(wrapper.state('player')).toBe('x');
		expect(wrapper.state('finished')).toBe(false);
		expect(wrapper.state('board')).toEqual([[null, null, null], [null, null, null], [null, null, null]]);
		expect(wrapper.find('div.status').find(TurnIndicator).prop('player')).toBe('x');
		expect(wrapper.instance().game.board).toEqual([[null, null, null], [null, null, null], [null, null, null]]);
		expect(wrapper.instance().game.history).toEqual([
			[[null, null, null], [null, null, null], [null, null, null]]
		]);
		expect(wrapper.instance().game.historyCursor).toBe(0);
		expect(wrapper.find('div.button-container').childAt(0).prop('disabled')).toBe(true);
		expect(wrapper.find('div.button-container').childAt(1).prop('disabled')).toBe(true);
	});
});
