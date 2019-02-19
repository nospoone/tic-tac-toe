import React, {Component} from 'react';
import './App.css';

import Title from '../Title/Title';
import Square from '../Square/Square';

class App extends Component {
	render() {
		return (
			<>
				<Title/>
				<Square mark="o"/>
				<Square mark="x"/>
				<Square/>
			</>
		);
	}
}

export default App;
