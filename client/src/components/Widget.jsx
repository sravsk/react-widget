import React from 'react';
import { Row, Col, Button } from 'antd';
import { Transition } from 'react-transition-group';
import 'antd/dist/antd.css';
import '../../styles/widget-style.css'

class Widget extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open : false
		}
	}



	 renderBody = () => {
		if (this.state.open) {
			return (
				<span className="dock" onClick={this.handleToggleOpen}></span>
				);
		}
		return '';
	}

	render() {
		const duration = 250;
		const defaultStyle = {
  				transition: `opacity ${duration}ms ease-in-out`,
  				opacity: 0,
			}

		const transitionStyles = {
  				entering: { opacity: 0 },
  				entered:  { opacity: 1 },
			}
		const body = this.renderBody();
		return (
			<div className="docked-widget">
			<Transition 
				in={this.state.open} 
				timeout={duration}>
					<Row className="widget-dialog">
					<Col className="widget-title">Hi Sravanthi! </Col>
					<span className="company-title">Salesforce Knowledge base</span>
					</Row>
					<Row className="widget-body">
					<Col className="body-title">Advice and anssers from Salesforce</Col>
					</Row>
					<Row className="widget-footer">
					Footer
					</Row>
			</Transition>
			{body}
			</div>
			)
	}
}
export default Widget;