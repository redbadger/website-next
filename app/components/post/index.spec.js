import React from 'react';
import Relay from 'react-relay';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

import Post from './';

const post = {
  id: 'ID1',
  title: 'Post title',
  body: 'Post body',
  author: {
    firstName: 'Albert',
    lastName: 'Still',
  },
};

class RelayContextComponent extends React.Component {

  static childContextTypes = {
    route: React.PropTypes.object,
  }

  getChildContext() {
    return { route: { name: '', params: {}, queries: { } } };
  }

  render() {
    return this.props.children;
  }
}

describe('app/components/post', () => {

  Relay.Store.update = sinon.spy();

  it('should call the add kudos callback', () => {
    const tree = TestUtils.renderIntoDocument(<RelayContextComponent><Post post={post} /></RelayContextComponent>);
    const kudosBtn = TestUtils.findRenderedDOMComponentWithTag(tree, 'button');
    TestUtils.Simulate.click(kudosBtn);
    expect(Relay.Store.update.called).to.be.true;
  });

});
