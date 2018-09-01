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
    axios.get(`http://ec2-54-153-34-178.us-west-1.compute.amazonaws.com:3000/api/${this.props.companyId}/categories/${this.props.category.id}/articlesdata`)
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
        <li key={article.id}>
        <Icon 
          type="file-text" 
          style={{ fontSize: 22}} 
          className="dock-button" />
        <div className="knowhow-article" onClick={(categoryArticle) => this.props.handleOpenArticle(article.id)}>{article.title}</div>
        </li>
        )
    });
    return (
     <div className="knowhow-categories" key={this.props.category.id}>
     {renderCategoryArticles}
     </div>
     
    );
  }
}

export default CategoryData;
