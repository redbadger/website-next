import React, {Component} from 'react';
import Container from '../container';
import Content from '../content';
import Section from '../section';
import styles from './style.css';
import * as textStyles from '../utils/text.css';
import Vimeo from '../vimeo';

class JoinUs extends Component {
  render () {
    return (
      <div>
        <Section>
          <Container>
            <Vimeo id="110925126" />
          </Container>
        </Section>
        <div className={styles.apply}>
          <Section>
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
          </Section>
        </div>
      </div>
    );
  }
}

export default JoinUs;
