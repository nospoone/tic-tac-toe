import React, {Component} from 'react';
import './App.css';

import Title from '../Title/Title';
import Square from '../Square/Square';
import Button from '../Button/Button';
import TurnIndicator from '../TurnIndicator/TurnIndicator';

class App extends Component {
	render() {
		return (
			<>
				<Title/>
				<div className="row">
					<Square pulse mark="x"/>
					<Square mark="o"/>
					<Square/>
				</div>
				<div className="row">
					<Square mark="o"/>
					<Square pulse mark="x"/>
					<Square mark="x"/>
				</div>
				<div className="row">
					<Square mark="x"/>
					<Square mark="o"/>
					<Square pulse mark="x"/>
				</div>
				<div className="status">
					<Undo/>
					<TurnIndicator finished player="x"/>
				</div>
			</>
		);
	}
}

export default App;
