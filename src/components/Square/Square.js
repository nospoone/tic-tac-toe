import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import './Square.css';

import Mark from '../Mark/Mark';

export default class Square extends Component {
	render() {
		return (
			<div
				className={className({
					square: true,
					'square--pulse': this.props.pulse,
					'square--disabled': this.props.mark !== undefined
				})}
			>
				<Mark active={this.props.mark !== undefined} mark={this.props.mark}/>
			</div>
		);
	}
}

Square.propTypes = {
	mark: PropTypes.oneOf(['x', 'o', undefined]),
	pulse: PropTypes.bool
};

Square.defaultProps = {
	mark: undefined,
	pulse: false
};
