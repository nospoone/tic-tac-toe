import React from 'react';
import { shallow } from 'enzyme';
import Undo from './Undo';

describe('Undo', () => {
	it('should render a <span/> with an `undo` class', () => {
		const wrapper = shallow(<Undo/>);
		expect(wrapper.find('span.undo').length).toEqual(1);
	});
	it('should have `Undo last move` as its text', () => {
		const wrapper = shallow(<Undo/>);
		expect(wrapper.find('span.undo').text()).toEqual('Undo last move');
	});
	it('should have the `undo--disabled` class when the `disabled` prop is set', () => {
		const wrapper = shallow(<Undo disabled/>);
		expect(wrapper.find('span.undo--disabled').length).toEqual(1);
	});
});
