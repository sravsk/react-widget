import React from 'react';
import { Input, Row, Col } from 'antd'
import axios from 'axios'

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: []
		};
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(value) {
		let hashedCompanyId = this.props.companyId;
		// send request to CMS
		axios.get(`http://localhost:3000/api/${hashedCompanyId}/search?term=${value}`)
			.then(results => {
				this.setState({
					articles: results.data.hits
				})
			})
	}

	render () {
		let renderSearchResults = this.state.articles.map(item => {
			let article = item._source;
			return (
				<li className="article-title" key={article.id} onClick={() => this.props.handleOpenArticle(article.id)}>{article.title}</li>
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
			</div>
			)
		}
}

export default Search;