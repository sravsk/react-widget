import React from 'react';
import '../../styles/widget-style.css'

class Widget extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="docked-widget">
				<div className="widget-dialog">
				<div className="widget-title">
				Hi Sravanthi! 
				<span className="company-title">Salesforce Knowledge base</span>
				</div>
				<div className="widget-body">
				<span className="body-title">Advice and anssers from Salesforce</span>
				</div>
				<div className="widget-footer">
				Footer
				</div>
				</div>
			</div>
			)
	}
}
export default Widget;