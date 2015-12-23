import React from 'react';
import classNames from 'classnames';
import Container from '../container';
import { Grid, Cell } from '../grid';
import styles from './style.css';
import * as icons from '../icons/style.css';

export default class Footer extends React.Component {
  render () {
    return (
      <footer className={styles.footer}>
        <Container>
          <Grid>

            <Cell>
              <address>
                <strong>Red Badger Consulting Limited</strong>
                <br/>
                <span>12 Mallow Street</span>
                <br/>
                <span>London EC1Y 8RQ</span>
                <br/>
                <a className={styles.contactUsLink} href="/about-us/contact-us">
                  Contact us >
                </a>
              </address>
            </Cell>

            <Cell>
              <ul className={styles.links} >
                <li>
                  <a className={styles.contactLink} href="mailto:hello@red-badger.com">
                    <span className={classNames(styles.iconCyan, icons.sketchEmail)} ></span>
                    {' hello@red-badger.com'}
                  </a>
                </li>
                <li>
                  <a className={styles.socialLink} href="http://twitter.com/redbadgerteam">
                    <span className={classNames(styles.icon, icons.socialTwitter)}></span>
                    {' @redbadgerteam'}
                  </a>
                </li>
                <li>
                  <a className={styles.socialLink} href="http://www.facebook.com/RedBadger">
                    <span className={classNames(styles.icon, icons.socialFacebook)}></span>
                    {' facebook'}
                  </a>
                </li>
                <li>
                  <a className={styles.socialLink} href="http://www.linkedin.com/companies/red-badger">
                    <span className={classNames(styles.icon, icons.socialLinkedin)}></span>
                    {' linkedin'}
                  </a>
                </li>
                <li>
                  <a className={styles.socialLink} href="https://instagram.com/redbadgerteam">
                    <span className={classNames(styles.icon, icons.socialInstagram)}></span>
                    {' instagram'}
                  </a>
                </li>
              </ul>
            </Cell>

          </Grid>
        </Container>
      </footer>
    );
  }
}
