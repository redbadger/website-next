import styles from './style.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <div>
          <p>
            <strong className={styles.strong}>
              Red Badger Consulting Limited
            </strong>
            <div> 12 Mallow Street </div>
            <div> London EC1Y 8RQ </div>
            <a href="/about-us/contact-us" className={styles.contactUs}>
              Contact us
              <span className={styles.contactUsSpan}>
                >
              </span>
            </a>
          </p>
        </div>

        <div>
          <ul>
              <li>
                <a href="mailto:hello@red-badger.com"
                  className={styles.contactLink} >
                  <span className={styles.redBadgerFont} >
                    @
                  </span>
                  {' hello@red-badger.com'}
                </a>
              </li>
              <li>
                <a href="http://twitter.com/redbadgerteam"
                  className={styles.contactLink} >
                  <span className={styles.redBadgerFont}>
                    t
                  </span>
                  {' @redbadgerteam'}
                </a>
              </li>
              <li>
                <a href="http://www.facebook.com/RedBadger"
                  className={styles.contactLink} >
                  <span className={styles.redBadgerFont}>
                    f
                  </span>
                  {' facebook'}
                </a>
              </li>
              <li>
                <a href="http://www.linkedin.com/companies/red-badger"
                  className={styles.contactLink} >
                  <span className={styles.redBadgerFont}>
                    l
                  </span>
                  {' linkedin'}
                </a>
              </li>
              <li>
                <a href="https://instagram.com/redbadgerteam"
                  className={styles.contactLink} >
                  <span className={styles.redBadgerFont}>
                    i
                  </span>
                  {' instagram'}
                </a>
              </li>
          </ul>
        </div>

        <div class="grid one-third newsletter">
          <p><strong>Join our newsletter</strong>
          </p>
          <form action="//red-badger.us6.list-manage.com/subscribe/post?u=0ab76cd515&amp;amp;id=b20af1dc4e" method="post" class="newsletter-form">
              <label>Suscribe to receive news, ideas and lessons learned from Red Badger</label>
              <div class="input-container">
                  <input type="text" id="mce-EMAIL" name="EMAIL" placeholder="Enter your email" class="newsletter-input"/>
                  <input type="submit" value="Subscribe" class="newsletter-submit"/>
                  <div id="bot-catcher">
                      <input type="text" name="b_0ab76cd515_b20af1dc4e" tabindex="-1" value=""/>
                  </div>
              </div>
          </form>
          <div class="copyright"><span>© Red Badger All Rights Reserved</span>
          </div>
        </div>
      </footer>
    );
  }
}
