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
    console.log('in CategoryData this.state.articles: ', this.state.articles)
    console.log('this.props: ', this.props.category.id)
    console.log('categoryData componentDidMount')
   var hashids = new Hashids('knowhow-api', 16);
       console.log(`${hashids.encode(this.props.category.id)}`)
    axios.get(`http://localhost:3000/api/${this.props.companyId}/categories/${this.props.category.id}/articlesdata`)
    .then(response => {
      const articles = response.data;
      this.setState({
        articles,
        renderArticles : 'knowhow-renderArticles'
      })
    })
  }

  componentDidUpdate() {
    console.log('UPDATE CATEGORYDATA')
    console.log('this.state')
    console.log(this.state)
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
