import Header from '../../header';
import Footer from '../../footer';

import styles from './style.css';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className={styles.container} >
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
