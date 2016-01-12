import React, {Component} from 'react';
import Container from '../container';
import { Grid, Cell } from '../grid';
import Section from '../section';
import styles from './style.css';
import Video from '../video';
import ComponentRenderer from '../component-renderer';

const titles = {
  type: 'Content',
  props: {
    children: [
      {
        type: 'Title1',
        props: {
          children: 'Join us'
        }
      },
      {
        type: 'Title3',
        props: {
          children: "Are we what you're looking for?*"
        }
      }
    ]
  }
};

const join = {
  type: 'Content',
  props: {
    children: [{
      type: 'Paragraph',
      props: {
        children: `We love doing fantastic work for our clients. We do this in integrated teams
        which are completely open with each other and our customers. It's all about
        communication and collaboration. It's about being innovative, being inspired,
        having fun and making magical things happen. Oh, and we're right in the heart
        of Tech City, Shoreditch so there's no shortage of great coffee shops...`
      }
    }, {
      type: 'Paragraph',
      props: {
        children: [{
          type: 'Strong',
          props: {
            children: "* And vice versa"
          }
        }]
      }
    }]
  }
};

const apply = {
  type: 'Content',
  props: {
    children: [
      {
        type: 'Title2',
        props: {
          children: 'How to Apply'
        }
      }, {
        type: 'Paragraph',
        props: {
          children: [
            `If you'd like more information, you want to apply, or you'd simply like to
            say 'hello', then please get in touch with your CV, Stackoverflow profile,
            Github, code, portfolio and anything else you think we might be interested
            in, at: `,
            {
              type: 'Link',
              props: {
                href: "mailto:jobs@red-badger.com",
                children: [
                  "jobs@red-badger.com."
                ]
              }
            }
          ],
          align: 'center'
        }
      }
    ]
  }
};

const listings = {
  type: 'Content',
  props: {
    children: [
      {
        type: 'JobOverview',
        props: {
          title: 'Badger Academy Internships',
          subtitle: 'Badger Academy is a little bit different to most internship programmes.',
          body: 'At the beginning of each summer we take on a group of students; usually around 6. They spend 2 months with us immersing themselves in life at Red Badger and learning about what it’s really like to work in a professional software workshop.',
          href: '/badger-academy-internships'
        }
      }
    ]
  }
};

class JoinUs extends Component {
  render () {
    return (
      <div>
        <Section>
          <Container>
            <ComponentRenderer data={titles} />
            <Grid>
              <Cell>
                <ComponentRenderer data={join} />
              </Cell>
              <Cell>
                <Video id="110925126" type="vimeo" />
              </Cell>
            </Grid>
          </Container>
        </Section>
        <Section>
          <Container>
            <ComponentRenderer data={listings} />
          </Container>
        </Section>
        <Section className={styles.apply}>
          <Container>
            <ComponentRenderer data={apply} />
          </Container>
        </Section>
      </div>
    );
  }
}

export default JoinUs;
