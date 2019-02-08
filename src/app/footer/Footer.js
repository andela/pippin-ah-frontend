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
        <FontAwesomeIcon
          icon={['fab', 'facebook-square']}
          className="facebook"
        />
        <FontAwesomeIcon icon={['fab', 'linkedin']} className="linkden" />
        <FontAwesomeIcon icon={['fab', 'twitter-square']} className="twitter" />
      </div>
      <div>
        <p className="footer-text">copyright &copy; LearnGround 2019.</p>
      </div>
    </div>
  );
}
