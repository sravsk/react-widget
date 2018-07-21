import React from 'react';
import axios from 'axios';
import { Icon, Row, Collapse } from 'antd';

class CategoryData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     articles : []
    }
  }


  componentDidMount() {
    axios.get(`http://localhost:3000/${this.props.companyId}/categories/${this.props.category.id}/articlesdata`)
    .then(response => {
      const articles = response.data;
      this.setState({ 
        articles,
        renderArticles : 'knowhow-renderArticles'
      })
    })
  }


  render() {
    const Panel = Collapse.Panel;
    const renderCategoryArticles = this.state.articles.map(article => {
      return (
        <li>
        <Icon 
          type="file-text" 
          style={{ fontSize: 22}} 
          className="dock-button" />
        <div className="knowhow-article" key={article.id}>{article.title}</div>
        </li>
        )
    });
    return (
     <div className="knowhow-categories" key={this.props.category.id} onClick={(categoryArticle) => this.props.handleOpenArticle(this.props.category.id)}>
     {renderCategoryArticles}
     </div>
     
    );
  }
}

export default CategoryData;
