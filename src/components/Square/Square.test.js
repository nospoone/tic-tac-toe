import React from 'react';
import {shallow} from 'enzyme';

import Square from './Square';
import Mark from '../Mark/Mark';

describe('Square', () => {
	it('should render a <div />', () => {
		const wrapper = shallow(<Square/>);
		expect(wrapper.find('div').length).toEqual(1);
	});
	it('should render a <Mark /> with its `mark` prop set to `x` when the `mark` prop is `x`', () => {
		const wrapper = shallow(<Square mark="x"/>);
		expect(wrapper.find(Mark).length).toEqual(1);
		expect(wrapper.find(Mark).prop('mark')).toEqual('x');
		expect(wrapper.find(Mark).prop('active')).toEqual(false);
	});
	it('should render a <Mark /> with its `mark` prop set to `x` when the `mark` prop is `x`', () => {
		const wrapper = shallow(<Square mark="o"/>);
		expect(wrapper.find(Mark).length).toEqual(1);
		expect(wrapper.find(Mark).prop('mark')).toEqual('o');
		expect(wrapper.find(Mark).prop('active')).toEqual(false);
	});
	it('should render a <Mark /> with its `active` prop set to `true` when the `active` prop is `true`', () => {
		const wrapper = shallow(<Square active mark="o"/>);
		expect(wrapper.find(Mark).length).toEqual(1);
		expect(wrapper.find(Mark).prop('mark')).toEqual('o');
		expect(wrapper.find(Mark).prop('active')).toEqual(true);
	});
	it('should render a <Mark /> when the `mark` prop is `null`', () => {
		const wrapper = shallow(<Square mark={null}/>);
		expect(wrapper.find(Mark).length).toEqual(1);
		expect(wrapper.find(Mark).prop('active')).toEqual(false);
		expect(wrapper.find(Mark).prop('mark')).toEqual(undefined);
	});
	it('should render a <Mark /> when the `mark` prop is `undefined`', () => {
		const wrapper = shallow(<Square/>);
		expect(wrapper.find(Mark).length).toEqual(1);
		expect(wrapper.find(Mark).prop('active')).toEqual(false);
		expect(wrapper.find(Mark).prop('mark')).toEqual(undefined);
	});
});
