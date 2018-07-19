import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import { Transition } from 'react-transition-group';
import axios from 'axios';
import Search from './Search.jsx'
import '../../styles/widget-style.css'

class Widget extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open : false,
			showDockedWidget : true,
			categories : [],
			companyDetails : [],
			articleDetails : []
		}
	}

// until CORS issue is fixed. 
	componentDidMount(){
		Promise.all([
			axios.get(`http://localhost:3000/api/${this.props.companyId}`),
			axios.get(`http://localhost:3000/${this.props.companyId}/categoriesdata`),
			axios.get(`http://localhost:3000/${this.props.companyId}/categories/2/articlesdata`)
			])
          .then(([companyDetails, categoryDetails, articleDetails]) => {
          	this.setState({
          	  companyDetails : companyDetails.data,
              categories: categoryDetails.data,
              articleDetails : articleDetails.data
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
					style={{ fontSize: 28, borderRadius: '50%', color: '#777', verticalAlign: 'middle', marginRight : '5px'}} 
					/>{category.name}
				</div>);
		});
		const renderCompanyDetails = this.state.companyDetails.map(company => {
			return (
				<span className="knowhow-company" key={company.id}>{company.name}</span>);
		});
		// Performance testing - rendering data inline vs child components 
		const renderArticles = this.state.articleDetails.map(article => {
			return (
				<li className="knowhow-company" key={article.id}>{article.title}</li>);
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
					<Col span={18} className="widget-title"><div className="knowhow-maintitle">Welcome!</div><span className="widget-header-close" onClick={this.handleToggleOpen}>X</span>
					<div className="widget-subtitle">Checkout {renderCompanyDetails} Knowledge Base</div></Col>
					<Search/>
					<div className="company-title">{renderCompanyDetails} Knowledge base</div>
					</Row>
					<Row className="widget-body">
					<Col className="body-categories">{renderCategories}</Col>
					</Row>
					<Row className="widget-body">
					<Col className="body-articles"><span class="knowhow-search-title">Featured Articles</span><ul className="articles-wrapper">{renderArticles}</ul></Col>
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