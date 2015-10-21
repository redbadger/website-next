import React from 'react';
import Relay from 'react-relay';
import styles from './style.css';
import moment from 'moment';

class DateStamp extends React.Component {
  render() {
    const dateTime = moment(this.props.post.publishedAt);
    return (
      <div className={styles.dateStamp}>
        <div className={styles.day} >{dateTime.format('DD')}</div>
        <div>{dateTime.format('MMM')}</div>
        <div>{dateTime.format('YYYY')}</div>
      </div>
    );
  }
}

export default Relay.createContainer(DateStamp, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        publishedAt
      }
    `
  }
});
