import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import './Undo.css';

export default class Undo extends Component {
	render() {
		return (
			<span
				className={className({
					undo: true,
					'undo--disabled': this.props.disabled
				})}
			>
				Undo last move
			</span>
		);
	}
}

Undo.propTypes = {
	disabled: PropTypes.bool
};

Undo.defaultProps = {
	disabled: false
};
