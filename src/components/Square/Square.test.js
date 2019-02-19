import React from 'react';
import {shallow} from 'enzyme';

import Square from './Square';

describe('Square', () => {
	it('should render a <div />', () => {
		const wrapper = shallow(<Square/>);
		expect(wrapper.find('div').length).toEqual(1);
	});
	it('should render an <svg /> when the `mark` prop is `x`', () => {
		const wrapper = shallow(<Square mark="x"/>);
		expect(wrapper.find('div').length).toEqual(1);
		expect(wrapper.find('svg').length).toEqual(1);
	});
	it('should render an <svg /> when the `mark` prop is `o`', () => {
		const wrapper = shallow(<Square mark="o"/>);
		expect(wrapper.find('div').length).toEqual(1);
		expect(wrapper.find('svg').length).toEqual(1);
	});
	it('should render an empty <div /> when the `mark` prop is `null`', () => {
		const wrapper = shallow(<Square mark={null}/>);
		expect(wrapper.find('div').length).toEqual(1);
		expect(wrapper.find('div').children().length).toEqual(0);
	});
	it('should render an empty <div /> when the `mark` prop is `undefined`', () => {
		const wrapper = shallow(<Square/>);
		expect(wrapper.find('div').length).toEqual(1);
		expect(wrapper.find('div').children().length).toEqual(0);
	});
});
