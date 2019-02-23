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
	it('should store a move when calling handleSquareClick', () => {
		const wrapper = shallow(<App/>);
		wrapper.instance().handleSquareClick(0, 0);
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
		wrapper.find('div.row[data-row=2]').childAt(0).simulate('click');
		wrapper.find('div.row[data-row=2]').childAt(1).simulate('click');
		expect(wrapper.state('player')).toBe('x');
	});
	it('should correctly set the board state when clicking a <Square/>', () => {
		const wrapper = mount(<App/>);
		wrapper.find('div.row[data-row=0]').childAt(0).simulate('click');
		expect(wrapper.instance().game.historyCursor).toBe(1);
		expect(wrapper.instance().game.board).toEqual([['x', null, null], [null, null, null], [null, null, null]]);
	});
});
