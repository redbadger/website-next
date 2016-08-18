import EventMeta from './index.js';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { defaultEvent } from '../../../../spec/fixtures/events.js';

describe.only('EventMeta component', () => {
  it('renders successfully with all props provided', () => {
    const wrapper = shallow(<EventMeta
      internalLinks={defaultEvent.internalLinks}
      externalLinks={defaultEvent.externalLinks}
      tags={defaultEvent.tags}
    />);
    expect(wrapper.find('div').length).to.equal(3);
  });

  it('renders successfully with only internal links provided', () => {
    const wrapper = shallow(<EventMeta
      internalLinks={defaultEvent.internalLinks}
    />);
    expect(wrapper.find('div').length).to.equal(3);
  });

  it('renders successfully with only external links provided', () => {
    const wrapper = shallow(<EventMeta
      externalLinks={defaultEvent.externalLinks}
    />);
    expect(wrapper.find('div').length).to.equal(3);
  });
});
