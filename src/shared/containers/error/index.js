import React, { Component } from 'react';
import Container from '../../components/container';
import typography from '../../components/typography/style.css';
import image from './missing_badger.png';
import styles from './style.css';

export default class ErrorPage extends Component {
  static propTypes = {
    code: React.propTypes.number
  }

  render () {
    let text;

    if (this.props.code === 500) {
      text = (
        <div>
          <p>{"We're working on it - really!"}</p>
        </div>
      );
    } else {
      text = (
        <div>
          <p>{"The page you’re looking for seems to have gone walkies."}</p>
          <p>{"Please use the navigation above to hunt it down."}</p>
        </div>
      );
    }

    return (
      <Container>
        <div className={styles.wrapper}>
          <h1 className={typography.h1}>Oops, sorry!</h1>
          <img alt="Missing Badger" src={image} />
          {text}
        </div>
      </Container>
    );
  }
}
