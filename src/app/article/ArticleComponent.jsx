import React, { Fragment } from 'react';
import CommentComponent from '../comment';
import HighlightCommentComponent from './HighlightCommentComponent';
import { EllipsisLoaderComponent } from '../loaders';
import { formatDate, constants } from './duck';
import './article.scss';

let that;
/* eslint-disable react/prefer-stateless-function */
class ArticleComponent extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      selectedText: '',
      highlightMenuStyle: {
        left: 0,
        top: 0,
        display: 'none',
      },
      hightlightCommentBoxStyle: {
        display: 'none',
      },
      displayedHighlight: {
        author: '',
        comment: '',
        style: {
          display: 'none',
        },
      },
    };
    this.shouldInitiateHighlights = true;
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

  componentDidUpdate() {
    if (this.shouldInitiateHighlights) {
      this.addCurrentHighlights();
    }
  }

  onSelectionMouseUp() {
    this.novalue = 0;
    if (window.getSelection().toString()) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const clonedSelection = range.cloneContents();
      const div = document.createElement('div');
      div.appendChild(clonedSelection);
      const selectedText = div.innerHTML;
      const { highlightMenuStyle } = this.state;
      this.setState({
        selectedText,
        highlightMenuStyle: {
          ...highlightMenuStyle,
          display: 'flex',
        },
      });
    }
  }

  onSelectionMouseDown(e) {
    this.setState({
      highlightMenuStyle: {
        left: `${e.pageX + 5}px`,
        top: `${e.pageY - 55}px`,
        display: 'none',
      },
      hightlightCommentBoxStyle: {
        left: `${e.pageX + 5}px`,
        top: `${e.pageY - 55}px`,
        display: 'none',
      },
    });
  }

  handleHighlightClick() {
    const { hightlightCommentBoxStyle } = this.state;
    this.setState({
      hightlightCommentBoxStyle: {
        ...hightlightCommentBoxStyle,
        display: 'flex',
      },
      highlightMenuStyle: {
        display: 'none',
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addHighlightComment(e) {
    e.preventDefault();
    const { selectedText } = that.state;
    const comment = e.target.elements.comment.value.trim();
    const {
      uploadHighlightedText,
      match: {
        params: { slug },
      },
    } = that.props;
    uploadHighlightedText({
      highlightedText: selectedText,
      startIndex: '10',
      stopIndex: '21',
      comment,
      slug,
    });
    that.setState({
      hightlightCommentBoxStyle: {
        display: 'none',
      },
      shouldProcessHighlight: true,
    });
  }

  addCurrentHighlights() {
    const {
      singleFetchStatus: {
        data: { highlights },
      },
    } = this.props;
    if (highlights) {
      highlights.forEach(highlight => {
        const highlightNode = document.getElementById(highlight.id);
        if (highlightNode) {
          highlightNode.addEventListener('mouseenter', e => {
            const { displayedHighlight } = this.state;
            if (displayedHighlight.style.display === 'none') {
              return this.setState({
                displayedHighlight: {
                  ...highlight,
                  style: {
                    ...displayedHighlight.style,
                    top: `${e.pageY}px`,
                    left: `${e.pageX}px`,
                    display: 'flex',
                  },
                },
              });
            }
          });
          highlightNode.addEventListener('mouseleave', () => {
            const { displayedHighlight } = this.state;
            if (displayedHighlight.style.display !== 'none') {
              return this.setState({
                displayedHighlight: {
                  ...highlight,
                  style: {
                    ...displayedHighlight.style,
                    display: 'none',
                  },
                },
              });
            }
          });
        }
      });
    }
  }

  render() {
    let data;
    console.log('-++++++++++++++++++', this.props);
    const {
      singleFetchStatus: { status },
      highlightUploadStatus,
      loginData,
      signupData,
    } = this.props;
    const newData = highlightUploadStatus.data;
    const newArticleData = this.props.singleFetchStatus.data;
    const {
      highlightMenuStyle,
      hightlightCommentBoxStyle,
      updatedData,
      displayedHighlight,
    } = this.state;
    let dateObject;
    if (newArticleData.author) {
      data = { ...newArticleData };
    }

    if (data) {
      if (
        newData &&
        highlightUploadStatus.status === constants.HIGHLIGHT_UPLOAD_SUCCESS
      ) {
        data.highlights.push({
          id: newData.id,
          highlightedText: newData.highlightedText,
          comment: newData.comment,
          author: {
            username: (loginData || signupData).username,
          },
        });
        highlightUploadStatus.status = '';
      }
      dateObject = formatDate(data.createdAt);
      if (data.highlights) {
        data.highlights.forEach(highlight => {
          data.body = data.body.replace(
            highlight.highlightedText,
            `<span style="background: rgb(218, 233, 10)" id="${highlight.id}">${
              highlight.highlightedText
            }</span>`,
          );
        });
      }
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
    if (status !== constants.FETCH_SINGLE_SUCCESS) {
      return <div />;
    }
    return (
      <Fragment>
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
              <div className="tools" style={highlightMenuStyle}>
                <i
                  className="fas fa-comment"
                  onClick={() => {
                    this.handleHighlightClick();
                  }}
                />
              </div>
              <form
                className="highlight-comment-box"
                style={hightlightCommentBoxStyle}
                onSubmit={this.addHighlightComment}
              >
                <div className="highlight-comment-header">Write note</div>
                <textarea
                  placeholder="write your thoughts"
                  name="comment"
                  required
                />
                <button type="submit" className="highlight-comment-reply">
                  Post
                </button>
              </form>
              <HighlightCommentComponent {...displayedHighlight} />
              <div
                className="article-text"
                id="article-text"
                dangerouslySetInnerHTML={{ __html: updatedData || data.body }}
                onMouseDown={e => {
                  this.onSelectionMouseDown(e);
                }}
                onMouseUp={() => {
                  this.onSelectionMouseUp();
                }}
                onMouseEnter={e => {}}
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
