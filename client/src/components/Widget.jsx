import React from 'react';
import { Row, Col } from 'antd';
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
		return (
			<Transition 
				in={this.state.open} 
				timeout={duration}>
				<div className="docked-widget">
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
				</div>
			</Transition>
			)
	}
}
export default Widget;