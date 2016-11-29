/* eslint react/no-set-state: 0 */
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import Badge from '../badge';
import NavItem from '../nav-item';
import styles from './style.css';
import classNames from 'classnames';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inView: true,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));

    this.offsetY = this.refs.nav.offsetTop;

    this.setState({
      inView: this.isInView(),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  isInView() {
    return window.pageYOffset < this.offsetY;
  }

  handleScroll() {
    const inView = this.state.inView;
    if (this.isInView() !== inView) {
      this.setState({
        inView: !inView,
      });
    }
  }

  render() {
    const fixedClass = {};
    const fixedBadgeClass = {};

    // eslint-disable-next-line max-len
    fixedBadgeClass[styles.fixedBadge] = fixedClass[styles.fixed] = !this.state.inView;

    const navClass = classNames(fixedClass, styles.nav);
    const badgeClass = classNames(fixedBadgeClass, styles.badge);

    return (
      <div className={styles.navWrapper}>
        <nav className={navClass} ref="nav">
          <ul className={styles.navList}>
            <NavItem href="/" title="Home" />
            <NavItem href="/what-we-do" title="What we do" />
            <NavItem href="/about-us" title="About us" />
            <NavItem href="/blog" title="Blog" />
            <NavItem href="/about-us/events" title="Events" />
          </ul>
          <div className={badgeClass}>
            <Badge />
          </div>
        </nav>
      </div>
    );
  }
}
