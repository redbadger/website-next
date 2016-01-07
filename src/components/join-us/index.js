import React, {Component} from 'react';
import Container from '../container';
import Content from '../content';
import styles from './style.css';
import * as textStyles from '../utils/text.css';

class JoinUs extends Component {
  render () {
    return (
      <div className={styles.joinUs}>
        <Container>
          <Content>
            <h2>How to Apply</h2>
            <p className={textStyles.center}>
              If you'd like more information, you want to apply, or you'd simply
              like to say 'hello', then please get in touch with your CV,
              Stackoverflow profile, Github, code, portfolio and anything else
              you think we might be interested in,
              at: <a href="mailto:jobs@red-badger.com">jobs@red-badger.com.</a>
            </p>
          </Content>
        </Container>
      </div>
    );
  }
}

export default JoinUs;
