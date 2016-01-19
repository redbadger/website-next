import React from 'react';
import Header from '../header';
import Footer from '../footer';

export default function Layout ({children}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.node
};
