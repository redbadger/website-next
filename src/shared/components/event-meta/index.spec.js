import EventMeta from './index.js';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { defaultEvent } from '../../../../spec/fixtures/events.js';

describe('EventMeta component', () => {
  it('renders successfully with default props', () => {
    const wrapper = shallow(<EventMeta
      internalLinks={defaultEvent.internalLinks}
      externalLinks={defaultEvent.externalLinks}
      tags={defaultEvent.tags}
    />);
    expect(wrapper.find('div').length).to.equal(2);
  });
});
