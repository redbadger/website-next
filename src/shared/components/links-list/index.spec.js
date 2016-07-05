import LinksList from './index';
import React from 'react';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';

describe.only('LinksList', () => {
  const listings = [{
    title: 'Red Badger',
    url: 'http://www.red-badger.com',
  }, {
    title: 'Falafels',
    url: 'http://www.example.falafel',
  }];

  beforeEach(() => {
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
    global.navigator = { userAgent: 'node.js' };
  });

  it('renders the link with correct external target', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
       <LinksList linkList={listings} listType='external' />
    );

    const link1 = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'div'
    ).getElementsByTagName('a')[0];

    expect(link1.href).to.equal('http://www.red-badger.com/');
    expect(link1.target).to.equal('_blank');
    expect(link1.text).to.equal('Red Badger');
  });

  it('renders the link with correct internal target', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
       <LinksList linkList={listings} listType='internal' />
    );

    const link2 = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'div'
    ).getElementsByTagName('a')[1];

    expect(link2.href).to.equal('http://www.example.falafel/');
    expect(link2.target).not.to.equal('_blank');
    expect(link2.text).to.equal('Falafels');
  });
});
