import React from 'react';
import { Row, Col, Button, Icon, Collapse } from 'antd';
import { Transition } from 'react-transition-group';
import axios from 'axios';
import Search from './Search.jsx';
import CategoryData from './CategoryData.jsx';
import Chat from './Chat.jsx';
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
			renderArticles : 'knowhow-hideArticles',
			renderChat : 'knowhow-chat-wrapper'
		}
		this.poll = this.poll.bind(this);
	}

	componentDidMount() {
		Promise.all([
			axios.get(`http://ec2-54-153-34-178.us-west-1.compute.amazonaws.com:3000/api/${this.props.companyId}`),
			axios.get(`http://ec2-54-153-34-178.us-west-1.compute.amazonaws.com:3000/api/${this.props.companyId}/categoriesdata`),
			axios.get(`http://ec2-54-153-34-178.us-west-1.compute.amazonaws.com:3000/api/${this.props.companyId}/articlesdata`)
			])
    .then(([companyDetails, categoryDetails, articleDetails]) => {
    	this.setState({
    	  companyDetails : companyDetails.data,
        categories: categoryDetails.data,
        articleDetails : articleDetails.data
      });
    })
    .then(() => {
			if (window.performance) {
			  var timeSincePageLoad = Math.round(performance.now());
			  this.props.gtag('event', 'timing_complete', {
			    'name': 'load',
			    'value': timeSincePageLoad,
			    'event_category': 'JS Dependencies'
			  });
			}
    })
	}

	handleBackButton = () => {
		this.setState ({
			renderArticles : 'knowhow-hideArticles',
			renderChat : 'knowhow-chat-wrapper'
		});
	}

  handleOpenArticle = (articleId) => {
  	this.props.gtag('event', 'view_item', {
  		'event_label': this.state.categoryId,
  		'companyId': this.props.companyId,
  		'categoryId': this.state.categoryId,
		  'articleId': articleId.toString()
		});
   	var hashids = new Hashids('knowhow-api', 16);
    axios.get(`http://ec2-54-153-34-178.us-west-1.compute.amazonaws.com:3000/api/${this.props.companyId}/article/${hashids.encode(articleId)}`)
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
		}, () => {
				if(this.state.open) {
				this.props.gtag('event', 'screen_view', {
				  'companyId': this.props.companyId
				});
			}
		})
	}

	openCategory = (e) => {
		this.setState({categoryId: e})
		this.props.gtag('event', 'view_item_list', {
		  'categoryId': e.toString()
		});
	}

	handleWidgetExit = () => {
		this.setState({
			showDockedWidget: true
		})
	}

	openChatService = () => {
		this.setState({
			renderChat : 'knowhow-chat-wrapper-show'
		})
	}

	poll = (e) => {
		this.props.gtag('event', 'select_content', {
		  'event_label': e.target.id,
  		'companyId': this.props.companyId,
  		'categoryId': this.state.categoryId,
		  'articleId': e.target.innerHTML.toString()
		});
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
		const showArticles = this.state.articleDetails.map(article => {
			return (
				<li key={article.id}>
	        <Icon
	          type="file-text"
	          style={{ fontSize: 22}}
	          className="dock-button" />
	        <div className="knowhow-article" onClick={(categoryArticle) => this.handleOpenArticle(article.id)}>{article.title}</div>
        </li>
				);
		});

		const renderCategoryArticles = this.state.articles.map(article => {
			return (
				<div>
					<div id="article" className="knowhow-widget-article" key={article.id}>
						<div className="knowhow-widget-article-mainTitle" dangerouslySetInnerHTML={{__html: article.title}}></div>
						<div className="knowhow-widget-article-mainDescription"  dangerouslySetInnerHTML={{__html: article.description}}></div>
						<div className="knowhow-widget-article-mainContent"  dangerouslySetInnerHTML={{__html: article.content}}></div>
					</div>
					<div className="feedback">
					Helpful? <button id={article.id} onClick={this.poll}>Yes</button><button id={article.id} onClick={this.poll}>No</button>
					</div>
				</div>
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
					<div className="knowhow-chat-box">
					 <span className="knowhow-chat-title">Start a conversation</span><br/>
					 <div className="knowhow-chat-newConversation" onClick={this.openChatService}>
					 <Icon
			          type="wechat"
			          style={{ fontSize: 22}}
			          className="dock-button"/>
					 <span>New Conversation</span>
	      			 </div>
					</div>
					<div className={this.state.renderChat}>
					<Chat renderChat={this.state.renderChat} handleBackButton={this.handleBackButton} handleToggleOpen={this.handleToggleOpen}/>
					</div>
					<Search companyId={this.props.companyId} handleOpenArticle={this.handleOpenArticle.bind(this)}/>
					<div className="company-title">{renderCompanyDetails} Knowledge base</div>

					</Row>
					<Row className="widget-body">
					<Col className="body-categories">
					<span className="knowhow-search-title">Categories</span><br/>
					<Collapse accordion bordered={false} onChange={this.openCategory}>
						{renderCategories}
					</Collapse>
					</Col>
					</Row>
					<Row className="widget-body">
					<div className={this.state.renderArticles}>
					<Row className="widget-dialog widget-title-articles">
					<Col span={6} className="widget-title-arrow">
					<Icon
						type="arrow-left"
						style={{ fontSize: 24, 'marginTop': '10px'}}
						onClick={this.handleBackButton} />
					</Col>
					<Col span={18} className="widget-title-articles"><div className="knowhow-maintitle">Knowledge Base!</div><span className="widget-header-close-articles" onClick={this.handleToggleOpen}>X</span>
					</Col>
					</Row>
					{renderCategoryArticles}
					</div>
					</Row>
					<Row className="widget-body-featured">
					<Col className="body-articles"><span className="knowhow-search-title">Featured Articles</span><br/><ul className="articles-wrapper">{showArticles}</ul></Col>
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
