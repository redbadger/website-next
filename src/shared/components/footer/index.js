import React, { Component } from 'react';
import classNames from 'classnames';
import Container from '../container';
import { Grid, Cell } from '../grid';
import Input from '../input';
import Button from '../button';
import styles from './style.css';
import * as icons from '../icons/style.css';
import * as display from '../utils/display.css';

export default class Footer extends Component {
  render () {
    return (
      <footer className={styles.footer}>
        <Container>
          <Grid fit>

            <Cell>
              <address className={styles.address}>
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

            <Cell>
              <h4 className={styles.newsletterHeading}>Join our newsletter</h4>
              <form action="//red-badger.us6.list-manage.com/subscribe/post?u=0ab76cd515&amp;amp;id=b20af1dc4e" className={styles.todo} method="post" >
                <label>
                  Suscribe to receive news, ideas and lessons learned from Red Badger
                </label>
                <div className={styles.inputContainer}>
                  <Input className={styles.inputText} name="EMAIL" placeholder="Enter your email" type="text"/>
                  <Button className={styles.inputSubmit} type="submit">Subscribe</Button>
                  <div className={display.hiddenVisually}>
                    <input name="b_0ab76cd515_b20af1dc4e" tabIndex="-1" type="text" value=""/>
                  </div>
                </div>
              </form>
              <div>
                <span>© Red Badger All Rights Reserved</span>
              </div>
            </Cell>

          </Grid>
        </Container>
      </footer>
    );
  }
}
