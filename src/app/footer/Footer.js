import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './footer.css';

library.add(fas, fab);

export default function Footer() {
  return (
    <div className="footer">
      <div className="social-media-icon-div">
        <FontAwesomeIcon
          icon={['fab', 'facebook-square']}
          style={{ fontSize: '25px', borderRadius: '50%', color: '#3B5998' }}
        />
        <FontAwesomeIcon
          icon={['fab', 'linkedin']}
          style={{ fontSize: '25px', borderRadius: '50%', color: '#65A2D9' }}
        />
        <FontAwesomeIcon
          icon={['fab', 'twitter-square']}
          style={{ fontSize: '25px', borderRadius: '50%', color: '#0E76A8' }}
        />
      </div>
      <div>
        <p style={{ fontSize: '13px' }}>copyright &copy; LearnGround 2019.</p>
      </div>
    </div>
  );
}
