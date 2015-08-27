import styles from './style.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerColumn}>
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

        <div className={styles.footerColumn}>
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

        <div className={styles.footerColumn}>
          <p>
            <strong className={styles.strong}>Join our newsletter</strong>
          </p>
          <form
            action="//red-badger.us6.list-manage.com/subscribe/post?u=0ab76cd515&amp;amp;id=b20af1dc4e"
            method="post"
            className={styles.todo} >
            <label>
              Suscribe to receive news, ideas and lessons learned from Red Badger
            </label>
            <div className={styles.inputContainer}>
              <input type="text" id="mce-EMAIL" name="EMAIL"
                placeholder="Enter your email" className={styles.inputText} />
              <input type="submit" value="Subscribe" class="newsletter-submit"
                className={styles.inputSubmit} />
              <div className={styles.botCatcher}>
                <input type="text" name="b_0ab76cd515_b20af1dc4e"
                  tabindex="-1" value=""/>
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
