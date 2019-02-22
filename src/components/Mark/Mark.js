import React, {Component} from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import './Mark.css';

export default class Mark extends Component {
	render() {
		const classes = className({
			mark: true,
			'mark--visible': this.props.mark !== null,
			'mark--green': this.props.mark === 'o',
			'mark--red': this.props.mark === 'x',
			'mark--active': this.props.active
		});

		return this.props.mark === 'x' ? (
			<svg className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
				<defs>
					<clipPath id="a">
						<path d="M0 36h36V0H0v36z"/>
					</clipPath>
				</defs>
				<g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 45)">
					<path d="M22.2383 17.9956l9.883 9.883c1.172 1.171 1.172 3.071 0 4.242-1.172 1.171-3.071 1.172-4.242 0l-9.883-9.883-9.883 9.883c-1.171 1.172-3.071 1.172-4.243 0-1.171-1.171-1.171-3.071.001-4.243l9.883-9.882-9.907-9.907c-1.172-1.171-1.172-3.071 0-4.242.586-.586 1.354-.879 2.121-.879.768 0 1.536.293 2.122.879l9.906 9.906 9.883-9.882c.586-.585 1.353-.878 2.121-.878.767 0 1.535.293 2.121.878 1.172 1.171 1.172 3.072 0 4.243l-9.883 9.882z"/>
				</g>
			</svg>
		) : (
			<svg className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.67 13.67">
				<g transform="translate(-57.23 -238.11)">
					<circle cx="64.06" cy="244.95" r="5.73" fill="none" strokeWidth="2.22"/>
				</g>
			</svg>
		);
	}
}

Mark.propTypes = {
	mark: PropTypes.oneOf(['x', 'o', null]),
	active: PropTypes.bool
};

Mark.defaultProps = {
	mark: null,
	active: false
};
