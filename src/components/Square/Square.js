import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import './Square.css';

import Mark from '../Mark/Mark';

export default class Square extends Component {
	constructor(props) {
		super(props);
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleOnClick() {
		this.props.onClick(this.props.x, this.props.y);
	}

	render() {
		return (
			<div
				className={className({
					square: true,
					'square--pulse': this.props.pulse,
					'square--disabled': this.props.mark !== undefined
				})}
				onClick={this.handleOnClick}
			>
				<Mark active={this.props.mark !== undefined} mark={this.props.mark}/>
			</div>
		);
	}
}

Square.propTypes = {
	x: PropTypes.oneOf([0, 1, 2]).isRequired,
	y: PropTypes.oneOf([0, 1, 2]).isRequired,
	onClick: PropTypes.func.isRequired,
	mark: PropTypes.oneOf(['x', 'o', undefined]),
	pulse: PropTypes.bool
};

Square.defaultProps = {
	mark: undefined,
	pulse: false
};
