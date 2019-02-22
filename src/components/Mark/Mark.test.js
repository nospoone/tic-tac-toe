import React from 'react';
import {shallow} from 'enzyme';

import Mark from '../Mark/Mark';

describe('Mark', () => {
	it('should log a warning if the `mark` prop is invalid', () => {
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
		shallow(<Mark mark="invalid"/>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('Invalid prop `mark` of value `invalid` supplied to `Mark`');
		spy.mockClear();
	});
	it('should render an <svg /> if the `mark` prop is present', () => {
		const wrapper = shallow(<Mark mark="x"/>);
		expect(wrapper.find('svg').length).toBe(1);
	});
	it('should render an <svg /> with the `mark--active` if the `active` prop is present', () => {
		const wrapper = shallow(<Mark active mark="x"/>);
		expect(wrapper.find('svg').hasClass('mark--active')).toBe(true);
	});
	it('should render an <svg /> with the `mark--visible` if the `mark` prop is not `null`', () => {
		const wrapper = shallow(<Mark mark="x"/>);
		expect(wrapper.find('svg').hasClass('mark--visible')).toBe(true);
	});
	it('should render an <svg /> without `mark--visible` if the `mark` prop is `null`', () => {
		const wrapper = shallow(<Mark mark={null}/>);
		expect(wrapper.find('svg').hasClass('mark--visible')).toBe(false);
	});
});
