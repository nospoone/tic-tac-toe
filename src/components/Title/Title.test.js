import React from 'react';
import {shallow} from 'enzyme';
import Title from './Title';

describe('Title', () => {
	it('should render an <h1 />', () => {
		const wrapper = shallow(<Title/>);
		expect(wrapper.find('h1').length).toEqual(1);
	});
	it('should have `Noughts & Crosses` as its text', () => {
		const wrapper = shallow(<Title/>);
		expect(wrapper.text()).toEqual('Noughts & Crosses');
	});
});
