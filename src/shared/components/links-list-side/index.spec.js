import LinksListSide from './index';
import React from 'react';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';

describe('LinksListSide', () => {
  const listings = [{
    id: 'V3pz8ykAACgAgAqr',
    slug: 'july-react-meetup',
    title: 'July React Meetup',
    datetime: {
      iso: '2016-07-26T17:00:00+0000',
      date: '26',
      month: '07',
      monthSym: 'Jul',
      year: '2016',
    },
  }, {
    id: 'V3pX0SkAAB9rOxXb',
    slug: 'july-react-meetup',
    title: 'July React Meetup',
    datetime: {
      iso: '2016-07-26T17:30:00+0000',
      date: '26',
      month: '07',
      monthSym: 'Jul',
      year: '2016',
    },
  }];

  beforeEach(() => {
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
    global.navigator = { userAgent: 'node.js' };
  });

  it('renders the events links', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
       <LinksListSide links={listings} title='Today' listType='events' />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'div'
    );

    const links = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'a'
    );

    expect(divs[1].innerHTML).to.equal('Today');
    expect(links[0].text).to.equal('July React Meetup');
    expect(links[0].href).to.equal('/about-us/events/2016/07/26/july-react-meetup');
  });

  it('renders the news links', () => {
    const news = [{
      id: 'V3UXoioAAJgGRLlP',
      slug: 'fortnums-are-commerce-innovation-leaders',
      tags: ['fortnum'],
      title: 'Fortnum’s are commerce innovation leaders',
      strapline: 'Innovation in commerce',
      externalLinks: [
        {
          title: 'Find out more about Millennial 20-20',
          url: 'http://millennial20-20.com/index.php',
        },
      ],
      datetime: {
        iso: '2016-04-13T11:00:00+0000',
        date: '13',
        month: '04',
        monthSym: 'Apr',
        year: '2016',
      },
      featureImageFilename: 'zia_at_millennial.jpg',
    }];

    const renderedComponent = TestUtils.renderIntoDocument(
       <LinksListSide links={news} title='Recent News' listType='news' />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'div'
    );

    const links = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'a'
    );

    expect(divs[1].innerHTML).to.equal('Recent News');
    expect(links[0].text).to.equal('Fortnum’s are commerce innovation leaders');
    expect(links[0].href).to.equal('/about-us/news/2016/04/13/fortnums-are-commerce-innovation-leaders');
  });
});
