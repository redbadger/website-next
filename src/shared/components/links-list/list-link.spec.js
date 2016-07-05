import ListLink from './list-link';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('ListLink', () => {
  const link = {
    title: 'Red Badger',
    url: 'http://www.red-badger.com',
  };

  describe('Render a link', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
         <ListLink link={link} direction='external' />
      );
    });

    it('will have a text', () => {
      expect(wrapper.text()).to.equal('Red Badger');
    });

    it('will have a blank target for external links', () => {
      expect(wrapper.is('a[target="_blank"]')).to.equal(true);
    });

    it.only('will have the correct link', () => {
      expect(wrapper.html()).to.contain('href="http://www.red-badger.com"');
    });
  });
});
