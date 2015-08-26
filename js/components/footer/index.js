import styles from './style.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <div class="container">
          <div class="row">
            <div class="grid one-third">
              <p>
                <strong>Red Badger Consulting Limited</strong>
                <br/>
                12 Mallow Street
                <br/>
                London EC1Y 8RQ
                <br/>
                <a href="/about-us/contact-us" class="google-map">
                  Contact us <span class="icon-sketch-arrow-right inline-end cyan"></span>
                </a>
              </p>
            </div>
              <div class="grid one-third">
                <ul>
                    <li><a href="mailto:hello@red-badger.com" class="email"><span class="icon-sketch-email cyan"></span>hello@red-badger.com</a>
                    </li>
                    <li><a href="http://twitter.com/redbadgerteam"><span class="icon-social-twitter light-green"></span>@redbadgerteam</a>
                    </li>
                    <li><a href="http://www.facebook.com/RedBadger"><span class="icon-social-facebook light-green"></span>facebook</a>
                    </li>
                    <li><a href="http://www.linkedin.com/companies/red-badger"><span class="icon-social-linkedin light-green"></span>linkedin</a>
                    </li>
                    <li><a href="https://instagram.com/redbadgerteam/"><span class="icon-social-instagram light-green"></span>instagram</a>
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
          </div>
        </div>
      </footer>
    );
  }
}
