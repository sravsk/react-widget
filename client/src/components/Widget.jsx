import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import { Transition } from 'react-transition-group';
import axios from 'axios';
import '../../styles/widget-style.css'

class Widget extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open : false,
			showDockedWidget : true,
			categories : [],
			companyDetails : []
		}
	}

// until CORS issue is fixed. 
	componentDidMount(){
		Promise.all([
			axios.get(`http://localhost:3000/api/${this.props.companyId}`),
			axios.get(`http://localhost:3000/${this.props.companyId}/categoriesdata`)
			])
          .then(([companyDetails, categoryDetails]) => {
          	this.setState({
          	  companyDetails : companyDetails.data,
              categories: categoryDetails.data
            });
          })
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
					type="book" 
					style={{ fontSize: 38, color: '#FFF', borderRadius: '50%', backgroundColor: '#159adc', padding: '15px'}} 
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
		const renderCategories = this.state.categories.map(category => {
			return (
				<div className="knowhow-categories" key={category.id}>
				<Icon 
					type="file-text" 
					style={{ fontSize: 28, borderRadius: '50%', color: '#777', verticalAlign: 'middle'}} 
					/>{category.name}
				</div>);
		});
		const renderCompanyDetails = this.state.companyDetails.map(company => {
			return (
				<span className="knowhow-company" key={company.id}>{company.name}</span>);
		});
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
					<Col span={18} className="widget-title">Hi there! <span className="widget-header-close" onClick={this.handleToggleOpen}>X</span></Col>
					
					<div className="company-title">{renderCompanyDetails} Knowledge base</div>
					</Row>
					<Row className="widget-body">
					<span className="body-title">Advice and Answers from {renderCompanyDetails}</span>
					<Col className="body-categories">{renderCategories}</Col>
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