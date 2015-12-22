import React from 'react';
import Header from '../header';

class Layout extends React.Component {
  render () {
    return (
      <div>
        <Header />
        {this.props.children}
        <footer></footer>
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.node
};

export default Layout;
