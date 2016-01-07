import React, {Component} from 'react';
import Container from '../container';
import Content from '../content';
import { Grid, Cell } from '../grid';
import Section from '../section';
import styles from './style.css';
import * as textStyles from '../utils/text.css';
import Video from '../video';

const joinTitle = `
  Join us
`;

const joinSubTitle = `
  Are we what you're looking for?*
`;

const joinP = `
  We love doing fantastic work for our clients. We do this in integrated teams
  which are completely open with each other and our customers. It's all about
  communication and collaboration. It's about being innovative, being inspired,
  having fun and making magical things happen. Oh, and we're right in the heart
  of Tech City, Shoreditch so there's no shortage of great coffee shops...
`;

const joinExtra = `
  * And vice versa
`;

const applyTitle = `
  How to Apply
`;

const applyP = (
  <p className={textStyles.center}>{`
  If you'd like more information, you want to apply, or you'd simply like to
  say 'hello', then please get in touch with your CV, Stackoverflow profile,
  Github, code, portfolio and anything else you think we might be interested
  in, at:
    `}
    <a href="mailto:jobs@red-badger.com">jobs@red-badger.com.</a>
  </p>
);

class JoinUs extends Component {
  render () {
    return (
      <div>
        <div>
          <Section>
            <Container>
              <Content>
                <h1>{joinTitle}</h1>
                <h3>{joinSubTitle}</h3>
              </Content>
              <Grid>
                <Cell>
                  <Content>
                    <p>{joinP}</p>
                    <p>
                      <strong>{joinExtra}</strong>
                    </p>
                  </Content>
                </Cell>
                <Cell>
                  <Video id="110925126" type="vimeo" />
                </Cell>
              </Grid>
            </Container>
          </Section>
        </div>
        <div className={styles.apply}>
          <Section>
            <Container>
              <Content>
                <h2>{applyTitle}</h2>
                {applyP}
              </Content>
            </Container>
          </Section>
        </div>
      </div>
    );
  }
}

export default JoinUs;
