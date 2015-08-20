export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="row">
            <div className="grid">
              <a href="/">
                <img src="/images/logos/redbadger_logo.png" alt="Red Badger Logo" className="logo" />
              </a>
            </div>
          </div>
        </div>

        <nav>
          <div className="container">
            <ul>
              <li>
                <a href="/"> Home </a>
              </li>
              <li>
                <a href="/our-work">Our Work</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/ideas">Ideas</a>
              </li>
              <li>
                <a href="/blog">
                  Blog
                  <div className="active" />
                </a>
              </li>
              <li>
                <a href="/about-us">About us</a>
              </li>
            </ul>
          </div>
          <div className="miniBadger">
            <a href="/">
              <div className="badge" />
            </a>
          </div>
        </nav>
      </header>
    );
  }
}
