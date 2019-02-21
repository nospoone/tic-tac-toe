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
					<div className="button-container">
						<Button>Undo</Button>
						<Button>Reset</Button>
					</div>
					<TurnIndicator finished player="x"/>
				</div>
			</>
		);
	}
}

export default App;
