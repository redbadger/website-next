import EventsTimelineTitle from './index.js';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('EventsTimelineTitle component', () => {
  it('renders successfully with timeline provided', () => {
    const wrapper = shallow(<EventsTimelineTitle timeline="today" />);
    expect(wrapper.find('h2').length).to.equal(1);
  });
});
