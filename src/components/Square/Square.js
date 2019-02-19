import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Square.css';

export default class Square extends Component {
	constructor(props) {
		super(props);

		this.assets = {
			x: (
				<svg className="square__image square__image--red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
					<defs>
						<clipPath id="a">
							<path d="M0 36h36V0H0v36z"/>
						</clipPath>
					</defs>
					<g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 45)">
						<path d="M22.2383 17.9956l9.883 9.883c1.172 1.171 1.172 3.071 0 4.242-1.172 1.171-3.071 1.172-4.242 0l-9.883-9.883-9.883 9.883c-1.171 1.172-3.071 1.172-4.243 0-1.171-1.171-1.171-3.071.001-4.243l9.883-9.882-9.907-9.907c-1.172-1.171-1.172-3.071 0-4.242.586-.586 1.354-.879 2.121-.879.768 0 1.536.293 2.122.879l9.906 9.906 9.883-9.882c.586-.585 1.353-.878 2.121-.878.767 0 1.535.293 2.121.878 1.172 1.171 1.172 3.072 0 4.243l-9.883 9.882z"/>
					</g>
				</svg>
			),
			o: (
				<svg className="square__image square__image--green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.67 13.67">
					<g transform="translate(-57.23 -238.11)">
						<circle cx="64.06" cy="244.95" r="5.73" fill="none" strokeWidth="2.22"/>
					</g>
				</svg>
			)
		};
	}

	render() {
		return (
			<div className="square">
				{this.assets[this.props.mark]}
			</div>
		);
	}
}

Square.propTypes = {
	mark: PropTypes.oneOf(['x', 'o', undefined, null])
};

Square.defaultProps = {
	mark: undefined
};
