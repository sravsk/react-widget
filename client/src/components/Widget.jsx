import React from 'react';
import { Row, Col, Button, Icon, Collapse } from 'antd';
import { Transition } from 'react-transition-group';
import axios from 'axios';
import Search from './Search.jsx';
import CategoryData from './CategoryData.jsx';
import '../../styles/widget-style.css';


class Widget extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open : false,
			showDockedWidget : true,
			categories : [],
			companyDetails : [],
			articleDetails : [],
			categoryId : [],
			articles : [],
			renderArticles : 'knowhow-hideArticles'
			
		}
	}

	componentDidMount(){
		Promise.all([
			axios.get(`http://localhost:3000/api/${this.props.companyId}`),
			axios.get(`http://localhost:3000/${this.props.companyId}/categoriesdata`),
			axios.get(`http://localhost:3000/${this.props.companyId}/articlesdata`)
			])
          .then(([companyDetails, categoryDetails, articleDetails]) => {
          	this.setState({
          	  companyDetails : companyDetails.data,
              categories: categoryDetails.data,
              articleDetails : articleDetails.data
            });
          })
	}

   handleOpenArticle = (categoryId) => {
    axios.get(`http://localhost:3000/${this.props.companyId}/categories/${categoryId}/articlesdata`)
    .then(response => {
      const articles = response.data;
      this.setState({ 
        articles,
        renderArticles : 'knowhow-showArticles'
      })
    })
  }

  handlePanelChange = (activeKey) => {
  	this.setState = {
  		activeKey 
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
					type="book" 
					style={{ fontSize: 38, color: '#FFF', borderRadius: '50%', backgroundColor: '#159adc', padding: '15px'}} 
					className="dock-button" 
					onClick={this.handleToggleOpen} />
				);
		}
		return '';
	}

	render() {
		const Panel = Collapse.Panel;
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
				<Panel header={category.name} key={category.id} showArrow={false}>
				<CategoryData key={category.id} category={category} companyId={this.props.companyId} handleOpenArticle={this.handleOpenArticle}/> 
				</Panel>
				);
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

		const renderCategoryArticles = this.state.articles.map(article => {
			return (
				<div className="knowhow-article" key={article.id}>{article.content}</div>
				)
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
					<Col className="body-categories">
					<span className="knowhow-search-title">Collections</span><br/>
					<Collapse bordered={false}>
						{renderCategories}
					</Collapse>
					</Col>
					</Row>
					<Row className="widget-body">
					<div className={this.state.renderArticles}>
					<Row className="widget-dialog">
					<Col span={6} className="widget-title-arrow">
					<Icon 
						type="arrow-left"
						style={{ fontSize: 24}} />
					</Col>
					<Col span={18} className="widget-title"><div className="knowhow-maintitle">Help Center!</div><span className="widget-header-close" onClick={this.handleToggleOpen}>X</span>
					</Col>
					</Row>
					{renderCategoryArticles}
					</div>
					</Row>
					<Row className="widget-body-featured">
					<Col className="body-articles"><span className="knowhow-search-title">Featured Articles</span><br/><ul className="articles-wrapper">{renderArticles}</ul></Col>
					</Row>
					<Row className="widget-body-renderArticles">
					<Col className="body-CategoryArticles">
					
					</Col>
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


