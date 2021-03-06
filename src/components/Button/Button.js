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
					[`button--${this.props.color}`]: true,
					'button--disabled': this.props.disabled
				})}
				onClick={this.props.onClick}
			>
				{this.props.children}
			</span>
		);
	}
}

Button.propTypes = {
	children: PropTypes.string.isRequired,
	color: PropTypes.oneOf(['orange', 'red']).isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool
};

Button.defaultProps = {
	disabled: false,
	onClick: undefined
};
