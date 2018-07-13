import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import { Transition } from 'react-transition-group';
import 'antd/dist/antd.css';
import '../../styles/widget-style.css'

class Widget extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open : false,
			showDockedWidget : true
		}
	}

	handleToggleOpen = () => {
		this.setState((prev) => {
			let { showDockedWidget } = prev;
			if (!prev.open) {
				showDockedWidget = false;
			}
			return {
				showDockedWidget,
				open: !prev.open
			}
		})
	}

	handleWidgetExit = () => {
		this.setState({
			showDockedWidget: true
		})
	}

	renderBody = () => {
		if (this.state.showDockedWidget) {
			return (
				<Icon 
					type="file-text" 
					style={{ fontSize: 38, color: '#08c', borderRadius: '10px', backgroundColor: '#0088cc5e', padding: '15px'}} 
					className="dock-button" 
					onClick={this.handleToggleOpen} />
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
				timeout={duration}
				onExited={this.handleWidgetExit}>
				 {status => (
				 <div 
				 style={{...defaultStyle, ...transitionStyles[status]}} 
				 className={`widget widget-${status}`}>
					<Row className="widget-dialog">
					<Col span={18} className="widget-title">Hi Sravanthi! </Col>
					<Col span={6} className="widget-header-icon" onClick={this.handleToggleOpen}>X</Col>
					<span className="company-title">Salesforce Knowledge base</span>
					</Row>
					<Row className="widget-body">
					<Col className="body-title">Advice and anssers from Salesforce</Col>
					</Row>
					<Row className="widget-footer">
					Footer
					</Row>
				</div>
				)}
			</Transition>
			{body}
			</div>
			)
	}
}
export default Widget;