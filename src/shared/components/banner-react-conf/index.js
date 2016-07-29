import React, { Component } from 'react';
import styles from './style.css';
import { imageMasterAssetsEndpoint } from '../../config';

export default class BannerReactConf extends Component {
  render() {
    return (
      <div className={styles.bannerContainer}>
        <a href="http://react.london/conference/" target="_blank">
          <img
            src={`${imageMasterAssetsEndpoint}react-conf-desktop-banner.png`}
            className={styles.reactConfDesktopBanner}
          />
          <img
            src={`${imageMasterAssetsEndpoint}react-conf-tablet-banner.png`}
            className={styles.reactConfTabletBanner}
          />
          <img
            src={`${imageMasterAssetsEndpoint}react-conf-mobile-banner.png`}
            className={styles.reactConfMobileBanner}
          />
        </a>
      </div>
    );
  }
}
