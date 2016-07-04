import React, { Component } from 'react';
import styles from './style.css';
import { imageAssetsEndpoint } from '../../config';

export default class BannerReactConf extends Component {
  render() {
    return (
      <div className={styles.bannerContainer}>
        <a href="http://react.london" target="_blank">
          <img
            src={`${imageAssetsEndpoint}/events/react-conf-desktop-banner.png`}
            className={styles.reactConfDesktopBanner}
          />
          <img
            src={`${imageAssetsEndpoint}/events/react-conf-tablet-banner.png`}
            className={styles.reactConfTabletBanner}
          />
          <img
            src={`${imageAssetsEndpoint}/events/react-conf-mobile-banner.png`}
            className={styles.reactConfMobileBanner}
          />
        </a>
      </div>
    );
  }
}
