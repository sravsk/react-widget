import React from 'react';
import { Input, Row, Col, Icon } from 'antd'
import axios from 'axios'
import Pagination from './Pagination.jsx';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: [],
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({
      pageOfItems: pageOfItems
    });
  }

	handleSearch(value) {
		let hashedCompanyId = this.props.companyId;
		// send request to CMS
		axios.get(`http://ec2-54-153-34-178.us-west-1.compute.amazonaws.com:3000/api/${hashedCompanyId}/search?term=${value}`)
			.then(results => {
				this.setState({
					articles: results.data
				})
			})
	}

	render () {
		let renderSearchResults = this.state.pageOfItems.map(article => {
			return (
				<li className="article-title" key={article.id}>
					<Icon
						type='file-text'
						style={{ fontSize: 22 }}
						className='dock-button' />
					<div className='knowhow-article' onClick={() => this.props.handleOpenArticle(article.id)}>{article.title}</div>
				</li>

			);
		});
		const Search = Input.Search;
		return (
			<div className="knowhow-search-wrapper">
				<span className="knowhow-search-title">Find an answer quickly</span>
				<Row>
				<Search style={{'display': 'block'}}
					placeholder="Search Knowledge base..."
					onSearch={value => this.handleSearch(value)}
					style={{ width : 200, marginTop : '10px'}} />
				</Row>
				<br/><br/><br/>
				<Row>
					{renderSearchResults}
				</Row>
				<Row>
					<Pagination items={this.state.articles} onChangePage={this.onChangePage} />
				</Row>
			</div>
			)
		}
}

export default Search;