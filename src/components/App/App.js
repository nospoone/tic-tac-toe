import React, {Component} from 'react';
import './App.css';

import Title from '../Title/Title';
import Square from '../Square/Square';

class App extends Component {
	render() {
		return (
			<>
				<Title/>
				<div className="row">
					<Square/>
					<Square/>
					<Square/>
				</div>
				<div className="row">
					<Square/>
					<Square/>
					<Square/>
				</div>
				<div className="row">
					<Square/>
					<Square/>
					<Square/>
				</div>
			</>
		);
	}
}

export default App;
