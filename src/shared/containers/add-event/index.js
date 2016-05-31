import Container from '../../components/container';
import React, { Component } from 'react';
import Section from '../../components/section';
import styles from './style.css';
import { connect } from 'react-redux';

export class AddEvents extends Component {

  render () {

    var { error } = this.props.location.query;

    return (
      <div>
        <Section>
          <Container>
            <h1 className={styles.h1}>Add Event</h1>
            {error ?
              <h1 className={styles.warning}>Something went wrong</h1>
              : []
            }
            <form action="/api/new-event" method="post">
              <h4>Title:</h4>
              <input className={styles.eventInputBox} name="title" type="text"/><br/><br/>
              <h4>Strapline:</h4>
              <input className={styles.eventInputBox} name="strapline" type="text"></input><br/><br/>
              <h4>Feature-Image Filename (or cloudinary link):</h4>
              <input className={styles.eventInputBox} name="featureImageFilename" type="text"></input><br/><br/>
              <h4>Body:</h4>
              <textarea className={styles.eventTextArea} name="body" type="text"></textarea><br/><br/>
              <h4>Date and Time:</h4>
              <input name="eventDate"  type="date"></input><input name="eventTime" type="time"></input><br/><br/>
              <h4>External link:</h4>
              <span>Title: </span><input className={styles.eventInputBox} name="externalTitle" type="text"></input><br/><br/>
              <span>URL: </span><input className={styles.eventInputBox} name="externalUrl" type="text"></input><br/><br/>
              <h4>Internal link:</h4>
              <span>Title: </span><input className={styles.eventInputBox} name="internalTitle" type="text"></input><br/><br/>
              <span>URL: </span><input className={styles.eventInputBox} name="internalUrl" type="text"></input><br/><br/>
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
