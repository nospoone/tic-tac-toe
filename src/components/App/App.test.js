import React from 'react';
import {shallow} from 'enzyme';

import App from './App';
import Title from '../Title/Title';

describe('App', () => {
	it('should render a <div />', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.find(Title).length).toEqual(1);
	});
});
