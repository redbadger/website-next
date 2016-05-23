import Container from '../../components/container';
import React, { Component } from 'react';
import Section from '../../components/section';
import styles from './style.css';
import { connect } from 'react-redux';
// import classNames from 'classnames';

export class AddEvents extends Component {

  render () {
    return (
      <div>
        <Section>
          <Container>
            <h1 className={styles.h1}>Add Event</h1>
            <form action="/api/new-event" method="post">
              <h4 className={styles.h4}>Title:</h4>
              <input type="text" name="title"/><br/><br/>
              <h4 className={styles.h4}>Strapline:</h4>
              <textarea type="text" name="strapline"></textarea><br/><br/>
              <h4 className={styles.h4}>Body:</h4>
              <textarea type="text" name="body"></textarea><br/><br/>
              <input type="submit" value="Submit" />
            </form>
          </Container>
        </Section>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    addEvents: state.addEvents
  };
}

export default connect(
  mapStateToProps
)(AddEvents);
