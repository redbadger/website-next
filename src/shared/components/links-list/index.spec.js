import LinksList from './index';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ListLink from './list-link';

describe('LinksList', () => {
  const listings = [{
    title: 'Red Badger',
    url: 'http://www.red-badger.com',
  }, {
    title: 'Falafels',
    url: 'http://www.example.falafel',
  }];

  it('renders 2 links', () => {
    const wrapper = shallow(
       <LinksList linkList={listings} listType='external' />
    );

    expect(wrapper.find(ListLink)).to.have.length(2);
  });
});
