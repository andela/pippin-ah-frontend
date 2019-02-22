import React, { Fragment } from 'react';
import CommentComponent from '../comment';
import { formatDate } from './duck';
import './article.scss';

/* eslint-disable react/prefer-stateless-function */
class ArticleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchSingleArticle } = this.props;
    fetchSingleArticle('what-linear-algebra-really-is-spicydicy');
  }

  render() {
    const {
      singleFetchStatus: { data, status },
    } = this.props;
    let dateObject;
    if (data) {
      dateObject = formatDate(data.createdAt);
    }

    return (
      <div className="main-cover">
        <div className="left-sidebar-cover">
          <div className="left-sidebar">
            <div className="side-bookmark" />
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
                      <i className="fas fa-user-alt" />
                    )}
                  </Fragment>

                  <div className="description-text">
                    <div className="author-info">
                      <span className="author-name">
                        {data &&
                          (data.author.lastName
                            ? `${data.author.firstName} ${data.author.lastName}`
                            : data.author.username)}
                      </span>
                      <span className="follow-button">follow</span>
                    </div>
                    <div className="article-details">
                      <span className="article-date">
                        {dateObject && dateObject.month}{' '}
                        {dateObject && dateObject.day},{' '}
                        {dateObject && dateObject.year}.
                      </span>
                      <span className="article-read-time">
                        {data.readTime} min read
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
            <div className="side-bookmark" />
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
            <div className="sidebar-author">SARAH GOBLIN</div>
            <div className="sidebar-articles">
              <p>Ethical Hacking Simplified</p>
              <p>True Words of Wisdom</p>
              <p>Understanding Politics</p>
              <p>In the Mystery of Life</p>
              <p>Communication Made Easy</p>
            </div>
          </div>
        </div>
        <div className="right-sidebar-cover">
          <div className="right-sidebar">
            <p className="more-articles">More Articles by</p>
            <div className="sidebar-author">SARAH GOBLIN</div>
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
    );
  }
}

export default ArticleComponent;
