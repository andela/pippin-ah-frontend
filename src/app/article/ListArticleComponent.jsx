import React, { Fragment } from 'react';
import lifecycle from 'react-pure-lifecycle';
import { Link } from 'react-router-dom';
import { constants } from './duck';
import getArticleCategory from './util/getArticleCategory';
import { EllipsisLoaderComponent } from '../loaders';
import './ListArticle.scss';

const category = getArticleCategory();

/* istanbul ignore next */
const methods = {
  componentDidMount({ fetchArticle, articleData, setCategory }) {
    if (!articleData) {
      fetchArticle(category);
    }
    if (articleData && articleData[category]) {
      return setCategory(category);
    }
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
      <div id="liArticleContainer" className="container">
        {fetchArticleState === 'FETCHING_ARTICLE' && elipsisLoader}
        <>
          <div className="col s12 center-align">
            <h3>{articleCategory}</h3>
          </div>
          <div className="col s12 right-align write-article">
            <Link to="/create-article">Write Article</Link>
          </div>
        </>
        <div className="row">
          {/* istanbul ignore next */
          fetchArticleState === constants.FETCH_ARTICLE_SUCCESS &&
            articleData[articleCategory] &&
            articleData[articleCategory].map(article => (
              <div
                id="liMainDivXz"
                className="col s12 m6 l4"
                key={article.slug}
              >
                <div className="card" id="liCardDivXz">
                  <div id="articleImageDivXz">
                    <img
                      id="articleImageXz"
                      className="activator"
                      alt="Cover"
                      src={article.coverImageUrl}
                    />
                  </div>
                  <div id="listTitleDivXz" className="card-content right-align">
                    <span
                      id="listTitleXz"
                      className="card-title activator flow-text truncate center-align"
                    >
                      {article.title}
                    </span>
                    <strong>by: {article.author}</strong>
                    <div id="liAuthorNameXz">
                      <Link to={`/article/${article.slug}`}>Read more</Link>
                    </div>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      {article.title}
                      <i className="material-icons right">close</i>
                    </span>
                    <p>{article.description}</p>
                    <div>
                      <p>
                        <span id="readTime">Read time: </span>
                        {article.readTime}
                        {article.readTime === 1 ? ' minute' : ' minutes'}
                      </p>
                      <Link to={`/article/${article.slug}`}>
                        Click here to read
                      </Link>
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
