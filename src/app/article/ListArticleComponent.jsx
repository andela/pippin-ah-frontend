/* eslint-disable max-len */
import React, { Fragment } from 'react';
import lifecycle from 'react-pure-lifecycle';
import { constants } from './duck';
import getArticleCategory from './util/getArticleCategory';
import { EllipsisLoaderComponent } from '../loaders';
import './ListArticle.scss';

const category = getArticleCategory();

const methods = {
  componentDidMount({ fetchArticle }) {
    fetchArticle(category);
  },
  componentDidUpdate({
    articleCategory,
    articleData,
    fetchArticle,
    setCategory,
  }) {
    const newCategory = getArticleCategory();
    const storeData = articleData && articleData[newCategory];
    if (articleCategory !== newCategory && !storeData) {
      fetchArticle(newCategory);
    }
    return setCategory(newCategory);
  },
};

const elipsisLoader = (
  <>
    <div className="li-loader">
      <EllipsisLoaderComponent />
    </div>
  </>
);

const ListArticleComponent = ({
  fetchArticleState,
  articleData,
  articleCategory,
}) => {
  return (
    <Fragment>
      <div className="container li-article">
        {fetchArticleState === 'FETCHING_ARTICLE' && elipsisLoader}
        <div className="col s12 center-align">
          <h3>{articleCategory}</h3>
        </div>
        <div className="row">
          {fetchArticleState === constants.FETCH_ARTICLE_SUCCESS &&
            articleData[articleCategory] &&
            articleData[articleCategory].map(article => (
              <div className="col s12 m6 l4" key={article.slug}>
                <div className="card">
                  <div id="article-li-image" className="card-image">
                    <img
                      className="activator"
                      alt="Cover"
                      src={article.coverImageUrl}
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
