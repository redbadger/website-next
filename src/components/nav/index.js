/*eslint react/no-set-state:0*/
/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import Badge from '../badge';
import styles from './style.css';
import classNames from 'classnames';

export default class Nav extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      inView: true
    };
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll.bind(this));

    this.offsetY = this.refs.nav.offsetTop;
    this.setState({
      inView: this.isInView()
    });
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  isInView () {
    return window.scrollY < this.offsetY;
  }

  handleScroll () {
    const inView = this.state.inView;
    if(this.isInView() !== inView) {
      this.setState({
        inView: !inView
      });
    }
  }

  render () {
    const fixedClass = {};
    const fixedBadgeClass = {};
    fixedBadgeClass[styles.fixedBadge] = fixedClass[styles.fixed] = !this.state.inView;

    const navClass = classNames(fixedClass, styles.nav);
    const badgeClass = classNames(fixedBadgeClass, styles.badge);

    return (
      <nav className={navClass} ref="nav">
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/">Home</a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/our-work">Our Work</a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/services">Services</a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/ideas">Ideas</a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/blog">Blog</a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navItemLink} href="/about-us">About us</a>
            <div className={styles.active}></div>
          </li>
        </ul>
        <div className={badgeClass}>
          <Badge />
        </div>
      </nav>
    );
  }
}
