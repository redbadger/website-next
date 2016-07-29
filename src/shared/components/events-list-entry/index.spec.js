import EventsListEntry from './index.js';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { defaultEvent } from '../../../../spec/fixtures/events.js';

describe('EventsListEntry component', () => {
  it('renders successfully with default props', () => {
    const wrapper = shallow(<EventsListEntry
      timeline="past"
      id={defaultEvent.id}
      tags={defaultEvent.tags}
      slug={defaultEvent.slug}
      title={defaultEvent.title}
      strapline={defaultEvent.strapline}
      startDateTime={defaultEvent.startDateTime}
      endDateTime={defaultEvent.endDateTime}
      externalLinks={defaultEvent.externalLinks}
      internalLinks={defaultEvent.internalLinks}
      featureImageFilename={defaultEvent.featureImageFilename}
    />);
    expect(wrapper.find('li').length).to.equal(1);
  });
});
