import React from 'react';
import {shallow} from 'enzyme';

import Square from './Square';
import Mark from '../Mark/Mark';

describe('Square', () => {
	it('should render a <div />', () => {
		const wrapper = shallow(<Square x={0} y={0} onClick={() => {}}/>);
		expect(wrapper.find('div').length).toEqual(1);
	});
	it('should render a <div /> with the `square` class', () => {
		const wrapper = shallow(<Square x={0} y={0} onClick={() => {}}/>);
		expect(wrapper.find('div.square').length).toEqual(1);
	});
	it('should render a <div /> with the `square--pulse` class when the `pulse` prop is set', () => {
		const wrapper = shallow(<Square pulse x={0} y={0} onClick={() => {}}/>);
		expect(wrapper.find('div.square--pulse').length).toEqual(1);
	});
	it('should render a <div /> with the `square--disabled` when the `mark` prop is set', () => {
		const wrapper = shallow(<Square x={0} y={0} mark="x" onClick={() => {}}/>);
		expect(wrapper.find('div.square--disabled').length).toEqual(1);
	});
	it('should render a <div /> without the `square--disabled` when the `mark` prop is set to null', () => {
		const wrapper = shallow(<Square x={0} y={0} mark={null} onClick={() => {}}/>);
		expect(wrapper.find('div.square--disabled').length).toBe(0);
	});
	it('should render a <Mark /> with its `mark` prop set to `x` when the `mark` prop is `x`', () => {
		const wrapper = shallow(<Square x={0} y={0} mark="x" onClick={() => {}}/>);
		expect(wrapper.find(Mark).length).toEqual(1);
		expect(wrapper.find(Mark).prop('mark')).toEqual('x');
		expect(wrapper.find(Mark).prop('active')).toEqual(true);
	});
	it('should render a <Mark /> with its `mark` prop set to `x` when the `mark` prop is `x`', () => {
		const wrapper = shallow(<Square x={0} y={0} mark="o" onClick={() => {}}/>);
		expect(wrapper.find(Mark).length).toEqual(1);
		expect(wrapper.find(Mark).prop('mark')).toEqual('o');
		expect(wrapper.find(Mark).prop('active')).toEqual(true);
	});
	it('should render a <Mark /> with its `active` prop set to `true` when the `mark` prop is not `null`', () => {
		const wrapper = shallow(<Square x={0} y={0} mark="o" onClick={() => {}}/>);
		expect(wrapper.find(Mark).length).toEqual(1);
		expect(wrapper.find(Mark).prop('mark')).toEqual('o');
		expect(wrapper.find(Mark).prop('active')).toEqual(true);
	});
	it('should render a <Mark /> when the `mark` prop is `null`', () => {
		const wrapper = shallow(<Square x={0} y={0} mark={null} onClick={() => {}}/>);
		expect(wrapper.find(Mark).length).toEqual(1);
		expect(wrapper.find(Mark).prop('active')).toEqual(false);
		expect(wrapper.find(Mark).prop('mark')).toBeNull();
	});
	it('should log a warning when the `x` prop is invalid', () => {
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
		shallow(<Square x={4} y={0} onClick={() => {}}/>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('Invalid prop `x` of value `4` supplied to `Square`');
		spy.mockClear();
	});
	it('should log a warning when the `y` prop is invalid', () => {
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
		shallow(<Square x={0} y={6} onClick={() => {}}/>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('Invalid prop `y` of value `6` supplied to `Square`');
		spy.mockClear();
	});
	it('should log a warning when the `onClick` prop is invalid', () => {
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
		shallow(<Square x={0} y={0} onClick="invalid"/>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('Invalid prop `onClick` of type `string` supplied to `Square`');
		spy.mockClear();
	});
	it('should log a warning when the `onClick` prop is missing', () => {
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
		shallow(<Square x={0} y={0}/>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('The prop `onClick` is marked as required in `Square`, but its value is `undefined`');
		spy.mockClear();
	});
	it('should call the `onClick` prop with the `x, y` parameters when the component is clicked', () => {
		const handleClickMock = jest.fn(() => {});
		const wrapper = shallow(<Square x={0} y={1} onClick={handleClickMock}/>);
		wrapper.simulate('click');
		expect(handleClickMock).toHaveBeenCalled();
		expect(handleClickMock).toHaveBeenCalledWith(0, 1);
	});
});
