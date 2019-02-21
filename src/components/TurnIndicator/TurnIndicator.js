import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import './TurnIndicator.css';

export default class TurnIndicator extends Component {
	getMessage(player, finished) {
		if (finished) {
			return player === 'x' ? 'X wins!' : 'O wins!';
		}

		return player === 'x' ? 'X\'s turn' : 'O\'s turn';
	}

	render() {
		return (
			<span
				className={className({
					'turn-indicator': true,
					'turn-indicator--finished': this.props.finished
				})}
			>
				{this.getMessage(this.props.player, this.props.finished)}
			</span>
		);
	}
}

TurnIndicator.propTypes = {
	player: PropTypes.oneOf(['x', 'o']).isRequired,
	finished: PropTypes.bool
};

TurnIndicator.defaultProps = {
	finished: false
};
