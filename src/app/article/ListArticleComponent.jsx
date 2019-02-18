/* eslint-disable max-len */
import React, { Fragment } from 'react';
import lifecycle from 'react-pure-lifecycle';
import { constants } from './duck';
import './ListArticle.scss';

const methods = {
  componentDidMount({ fetchArticle }) {
    fetchArticle();
  },
};

const ListArticleComponent = ({ fetchArticleState, articleData }) => {
  return (
    <Fragment>
      <div className="container">
        <div className="col s12 center-align">
          <h3>Arts</h3>
        </div>
        <div className="row">
          {fetchArticleState === constants.FETCH_ARTICLE_SUCCESS &&
            articleData.articles.map(article => (
              <div className="col s12 m6 l4" key={article.slug}>
                <div className="card">
                  <div className="card-image">
                    <img
                      className="activator"
                      alt="Cover"
                      src="https://i.pinimg.com/564x/b2/69/9d/b2699de28deffa0883978ffecfd977a1.jpg?b=t"
                    />
                  </div>
                  <div className="card-content right-align">
                    <span className="card-title activator flow-text truncate center-align">
                      {article.title}
                    </span>
                    <strong>by: {article.author}</strong>
                    <div>
                      <a href="/#">Read more</a>
                    </div>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      {article.title}
                      <i className="material-icons right">close</i>
                    </span>
                    <p>{article.description}</p>
                    <div>
                      <a href="/#">Click here to read</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default lifecycle(methods)(ListArticleComponent);
