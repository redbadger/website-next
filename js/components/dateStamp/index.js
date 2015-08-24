import 'babel/polyfill';
import styles from './style.css';
import moment from 'moment';

class PostPreview extends React.Component {
  render() {
    const dateTime = moment(this.props.iso8601);
    return (
      <div className={styles.dateStamp}>
        <div className={styles.day} >{dateTime.format('DD')}</div>
        <div>{dateTime.format('MMM')}</div>
        <div>{dateTime.format('YYYY')}</div>
      </div>
    );
  }
}

export default Relay.createContainer(PostPreview, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        publishedAt
      }
    `,
  },
});
