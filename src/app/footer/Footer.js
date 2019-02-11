import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import '../../style/footer.scss';

library.add(fas, fab);

export default function Footer() {
  return (
    <div className="footer">
      <div className="social-media-icon-div">
        <div className="social-media-wrapper-facebook">
          <FontAwesomeIcon icon={['fab', 'facebook-f']} className="facebook" />
        </div>
        <div className="social-media-wrapper-twitter">
          <FontAwesomeIcon icon={['fab', 'twitter']} className="twitter" />
        </div>
        <div className="social-media-wrapper-linkden">
          <FontAwesomeIcon icon={['fab', 'linkedin-in']} className="linkden" />
        </div>
      </div>
      <p className="footer-text">copyright &copy; LearnGround 2019.</p>
    </div>
  );
}
