import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import './Button.css';

export default class Button extends Component {
	render() {
		return (
			<span
				className={className({
					button: true,
					'button--disabled': this.props.disabled
				})}
			>
				{this.props.children}
			</span>
		);
	}
}

Button.propTypes = {
	disabled: PropTypes.bool,
	children: PropTypes.string.isRequired
};

Button.defaultProps = {
	disabled: false
};
