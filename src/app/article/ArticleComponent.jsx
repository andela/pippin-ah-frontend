import React from 'react';
import './article.scss';

const ArticleComponent = () => {
  return (
    <div className="cover">
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
            <div className="article-title">
              <p>Nature In Her Genes</p>
            </div>
            <div className="article-description">
              <p>
                A fingerprint of gene activity could reveal the true
                youthfulness of our kidneys, hearts and muscle, regardless of
                our biological age. The technique might one day be used.
              </p>
            </div>
          </div>
          <div className="article-category">
            <div className="category-image" />
          </div>
          <div className="author-description">
            <div className="profile-photo-container" />
            <div className="description-text">
              <div className="author-info">
                <span className="author-name">Sarah Goblin </span>
                <span className="follow-button">follow</span>
              </div>
              <div className="article-details">
                <span className="article-date">Jan 7, 2019.</span>
                <span className="article-read-time">3 min read</span>
              </div>
              <div className="article-likes">
                <span className="total-likes">21</span>
                <div className="like-button" />
              </div>
            </div>
          </div>
        </div>
        <div className="article-content">
          <div className="short-title">
            <h3>The Ways of the Man in the Cave</h3>
          </div>
          <div className="article-text">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham.
          </div>
        </div>
        <div className="left-sidebar-down">
          <div className="side-bookmark" />
          <div className="side-like" />
          <div className="side-facebook" />
          <div className="side-twitter" />
        </div>
        <div className="comment-section">
          <span className="total-comments">12</span>Comments
        </div>
        <div className="comment-box">
          <div className="header-wrapper">
            <div className="comment-owner">
              <div className="owner-image" />
            </div>
            <div className="comment-container">
              <div className="comment-header">
                <span className="comment-author">Paul Mayer</span>
                <span className="comment-date">January 7, 2019</span>
                <span className="reply-button">Reply</span>
              </div>
              <p className="comment-text">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33.
              </p>
            </div>
          </div>
        </div>
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
            <p>In the Days of Mr X</p>
            <p>Knowing your True Value</p>
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
            <p>In the Days of Mr X</p>
            <p>Knowing your True Value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleComponent;