import React from 'react';
import {shallow} from 'enzyme';
import TurnIndicator from './TurnIndicator';

describe('TurnIndicator', () => {
	it('should render a <span/> with a `turn-indicator` class', () => {
		const wrapper = shallow(<TurnIndicator player="x"/>);
		expect(wrapper.find('span.turn-indicator').length).toEqual(1);
	});
	it('should log a warning if the `player` prop is invalid', () => {
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
		shallow(<TurnIndicator player="invalid"/>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('Invalid prop `player` of value `invalid` supplied to `TurnIndicator`');
		spy.mockClear();
	});
	it('should render a <span/> with a `turn-indicator` class which contains `X\'s turn` when the `player` prop is set to `x`', () => {
		const wrapper = shallow(<TurnIndicator player="x"/>);
		expect(wrapper.find('span.turn-indicator').text()).toEqual('X\'s turn');
	});
	it('should render a <span/> with a `turn-indicator` class which contains `O\'s turn` when the `player` prop is set to `o`', () => {
		const wrapper = shallow(<TurnIndicator player="o"/>);
		expect(wrapper.find('span.turn-indicator').text()).toEqual('O\'s turn');
	});
	it('should render a <span/> with a `turn-indicator--finished` class which contains `X wins!` when the `player` prop is set to `x` and the `finished` prop is set to `true`', () => {
		const wrapper = shallow(<TurnIndicator finished player="x"/>);
		expect(wrapper.find('span.turn-indicator--finished').text()).toEqual('X wins!');
	});
	it('should render a <span/> with a `turn-indicator--finished` class which contains `O wins` when the `player` prop is set to `o` and the `finished` prop is set to `true`', () => {
		const wrapper = shallow(<TurnIndicator finished player="o"/>);
		expect(wrapper.find('span.turn-indicator--finished').text()).toEqual('O wins!');
	});
});
