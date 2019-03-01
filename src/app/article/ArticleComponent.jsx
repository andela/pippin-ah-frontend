import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CommentComponent from '../comment';
import { EllipsisLoaderComponent } from '../loaders';
import { formatDate, constants } from './duck';
import './article.scss';

/* eslint-disable react/prefer-stateless-function */
class ArticleComponent extends React.Component {
  static propTypes = {
    fetchSingleArticle: PropTypes.func.isRequired,
    bookmarkArticle: PropTypes.func.isRequired,
    removeBookmark: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      fetchSingleArticle,
      match: {
        params: { slug },
      },
    } = this.props;
    fetchSingleArticle(slug);
  }

  bookmarkButton = (removeBookmarkId, bookmarkId) => {
    const doBookmarkArticle = slug => {
      const { bookmarkArticle, articleData } = this.props;
      bookmarkArticle(slug, articleData.Bookmarks);
    };

    const doRemoveBookmark = slug => {
      const { removeBookmark, articleData } = this.props;
      removeBookmark(slug, articleData);
    };

    const {
      singleFetchStatus: { data },
      bookmarkArticleState,
    } = this.props;
    if (
      bookmarkArticleState === constants.BOOKMARKED ||
      bookmarkArticleState === constants.BOOKMARKING_ARTICLE ||
      bookmarkArticleState === constants.BOOKMARK_ARTICLE_SUCCESS ||
      bookmarkArticleState === constants.REMOVE_BOOKMARK_ERROR
    ) {
      return (
        <>
          <button
            id={removeBookmarkId}
            type="button"
            onClick={() => doRemoveBookmark(data.slug)}
          >
            <i className="material-icons">bookmark</i>
          </button>
        </>
      );
    }
    return (
      <>
        <button
          id={bookmarkId}
          type="button"
          onClick={() => doBookmarkArticle(data.slug)}
        >
          <i className="material-icons">bookmark_border</i>
        </button>
      </>
    );
  };

  render() {
    const {
      singleFetchStatus: { data, status },
    } = this.props;

    let dateObject;
    if (data) {
      dateObject = formatDate(data.createdAt);
    }
    if (status === constants.FETCHING_SINGLE) {
      return (
        <div className="center-in-screen">
          <EllipsisLoaderComponent />
        </div>
      );
    }
    if (status === constants.FETCH_SINGLE_ERROR) {
      return (
        <div className="center-in-screen">
          <div className="error-message-container">
            <div className="content">
              <div className="header">
                There was some error fetching your article
              </div>
              <ul className="error-list">
                <li className="content">{data}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return (
      <Fragment>
        <div className="main-cover">
          <div className="left-sidebar-cover">
            <div className="left-sidebar">
              {this.bookmarkButton('removeBookmarkBtn', 'bookmarkBtn')}
              <div className="side-like" />
              <div className="side-facebook" />
              <div className="side-twitter" />
            </div>
          </div>
          <div className="container">
            <div className="wrapper">
              <div className="article-header">
                <div className="article-title">{data.title}</div>
                <div className="article-description">
                  <p>{data.description}</p>
                </div>
                <div className="author-description">
                  <div className="author-heading">
                    <Fragment>
                      {data && data.author.imageUrl ? (
                        <img
                          src={data.author.imageUrl}
                          className="profile-photo-container"
                          alt="profile"
                        />
                      ) : (
                        <div className="default-photo">
                          {data.author && data.author.username[0].toUpperCase()}
                        </div>
                      )}
                    </Fragment>
                    <div className="description-text">
                      <div className="author-info">
                        <span className="author-name">
                          {data &&
                            (data.author.lastName
                              ? `${data.author.firstName} ${
                                  data.author.lastName
                                }`
                              : data.author.username)}
                        </span>
                        <span className="follow-button">Follow</span>
                      </div>
                      <div className="article-details">
                        <span className="article-date">
                          {dateObject && dateObject.month}{' '}
                          {dateObject && dateObject.day},{' '}
                          {dateObject && dateObject.year}
                        </span>
                        <span className="article-read-time">
                          {`. `}
                          {`${data.readTime}`} min read
                        </span>
                      </div>
                      <div className="article-likes">
                        <span className="total-likes">{data.totalLikes}</span>
                        <div className="like-button" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="article-category">
                <img
                  className="category-image"
                  src={data.coverImageUrl}
                  alt="article cover"
                />
              </div>
            </div>
            <div className="article-content">
              <div
                className="article-text"
                dangerouslySetInnerHTML={{ __html: data.body }}
              />
            </div>
            <div className="left-sidebar-down">
              {this.bookmarkButton('m-removeBookmarkBtn', 'm-bookmarkBtn')}
              <div className="side-like" />
              <div className="side-facebook" />
              <div className="side-twitter" />
            </div>
            <div className="comment-section">
              <span className="total-comments">
                {data.comments && data.comments.length}
              </span>
              Comments
            </div>
            {data.comments &&
              data.comments.map(comment => (
                <CommentComponent commentDetails={comment} key={comment.id} />
              ))}
            <div className="add-comment-box">
              <div className="comment-header">
                <div className="pen-image" />
                <span className="comment-author">Write Comment</span>
              </div>
              <textarea placeholder="Write your comment..." defaultValue="" />
              <button type="button">Post</button>
            </div>
            <div className="right-sidebar-down">
              <p className="more-articles">More Articles by</p>
              <div className="sidebar-author">
                {data &&
                  (data.author.lastName
                    ? `${data.author.firstName} ${data.author.lastName}`
                    : data.author.username)}
              </div>
              <div className="sidebar-articles">
                <p>Ethical Hacking Simplified</p>
                <p>True Words of Wisdom</p>
                <p>Understanding Politics</p>
                <p>In the Mystery of Life</p>
                <p>Communication Made Easy</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ArticleComponent;
