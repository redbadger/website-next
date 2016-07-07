import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { defaultEvent } from '../../../../spec/fixtures/events';
import { defaultNews } from '../../../../spec/fixtures/news';
import TagContainer from './container';
import jsdom from 'jsdom';

describe('TagContainer', () => {
  const tag = 'my-falafel-tag';

  beforeEach(() => {
    if (typeof document === 'undefined') {
      const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
      global.document = doc;
      global.window = doc.defaultView;
    }
  });

  it('renders no tags found', () => {
    const wrapper = mount(
       <TagContainer tag={tag} allEvents={null} allNews={null} />
    );

    expect(wrapper.text()).to.contain(`We don't have anything related to "${tag}" at the moment`);
  });

  it('renders all events', () => {
    const wrapper = mount(
       <TagContainer tag={tag} allEvents={[defaultEvent]} allNews={[]} />
    );

    expect(wrapper.html()).to.contain(tag);
    expect(wrapper.text()).to.contain(defaultEvent.title);
  });

  it('renders all news', () => {
    const wrapper = mount(
       <TagContainer tag={tag} allEvents={[]} allNews={[defaultNews]} />
    );

    expect(wrapper.html()).to.contain(tag);
    expect(wrapper.text()).to.contain(defaultNews.title);
  });

  it('renders all events and news', () => {
    const wrapper = mount(
       <TagContainer
         tag={tag}
         allEvents={[defaultEvent]}
         allNews={[defaultNews]} />
    );

    expect(wrapper.html()).to.contain(tag);
    expect(wrapper.text()).to.contain(defaultEvent.title);
    expect(wrapper.text()).to.contain(defaultNews.title);
  });
});
