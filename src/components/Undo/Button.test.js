import React from 'react';
import {shallow} from 'enzyme';
import Button from './Button';

describe('Button', () => {
	it('should render a <span/> with a `button` class', () => {
		const wrapper = shallow(<Button/>);
		expect(wrapper.find('span.button').length).toEqual(1);
	});
	it('should have the value of the `children` prop as its text', () => {
		const buttonText = 'Undo';
		const wrapper = shallow(<Button>{buttonText}</Button>);
		expect(wrapper.find('span.button').text()).toEqual(buttonText);
	});
	it('should have the `button--disabled` class when the `disabled` prop is set', () => {
		const wrapper = shallow(<Button disabled/>);
		expect(wrapper.find('span.button--disabled').length).toEqual(1);
	});
});
