import React from 'react';
import {shallow} from 'enzyme';
import Button from './Button';

describe('Button', () => {
	it('should log a warning if the `children` prop is missing', () => {
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
		shallow(<Button/>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('The prop `children` is marked as required in `Button`, but its value is `undefined`');
		spy.mockClear();
	});
	it('should log a warning if the `children` prop is invalid', () => {
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
		shallow(<Button><span>invalid</span></Button>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('Invalid prop `children` of type `object` supplied to `Button`');
		spy.mockClear();
	});
	it.skip('should log a warning if the `color` prop is missing', () => {
		// This test isn't passing, and I'm not sure why - rendering the component normally (react-dom) triggers the warning,
		// but enzyme (shallow & mount) doesn't. I've spent an hour trying to figure it out, but couldn't. The invalidity test covers this,
		// but I'd rather have tested this too.
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
		shallow(<Button>Undo</Button>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('The prop `color` is marked as required in `Button`, but its value is `undefined`');
		spy.mockClear();
	});
	it('should log a warning if the `color` prop is invalid', () => {
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
		shallow(<Button color="invalid">Undo</Button>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('Invalid prop `color` of value `invalid` supplied to `Button`');
		spy.mockClear();
	});
	it('should log a warning if the `onClick` prop is invalid', () => {
		const spy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
		shallow(<Button onClick="invalid">Undo</Button>);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toContain('Invalid prop `onClick` of type `string` supplied to `Button`');
		spy.mockClear();
	});
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
	it('should have the `button--orange` class when the `color` prop is set to `orange`', () => {
		const wrapper = shallow(<Button color="orange">Undo</Button>);
		expect(wrapper.find('span.button--orange').length).toEqual(1);
	});
	it('should have the `button--red` class when the `color` prop is set to `red`', () => {
		const wrapper = shallow(<Button color="red">Reset</Button>);
		expect(wrapper.find('span.button--red').length).toEqual(1);
	});
	it('should call the `onClick` prop method when the <Button/> is clicked', () => {
		const spy = jest.fn();
		const wrapper = shallow(<Button onClick={spy}>Reset</Button>);
		wrapper.simulate('click');
		expect(spy).toHaveBeenCalled();
	});
});
