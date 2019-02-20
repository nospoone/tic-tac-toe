import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Square.css';

import Mark from '../Mark/Mark';

export default class Square extends Component {
	render() {
		return (
			<div className="square">
				<Mark active={this.props.mark !== undefined} mark={this.props.mark}/>
			</div>
		);
	}
}

Square.propTypes = {
	mark: PropTypes.oneOf(['x', 'o', undefined])
};

Square.defaultProps = {
	mark: undefined
};
