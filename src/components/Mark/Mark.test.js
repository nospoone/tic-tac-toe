import React from 'react';
import {shallow} from 'enzyme';

import Mark from '../Mark/Mark';

describe('Mark', () => {
	const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

	it('should not render if the `mark` prop is missing', () => {
		shallow(<Mark/>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('The prop `mark` is marked as required');
		spy.mockClear();
	});

	it('should not render if the `mark` prop is invalid', () => {
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
});
