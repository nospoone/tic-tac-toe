import React, {Fragment} from 'react';
import {shallow} from 'enzyme';

import App from './App';
import Title from '../Title/Title';
import Square from '../Square/Square';

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
});
