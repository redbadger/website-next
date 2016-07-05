import LinksListSide from './index';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('LinksListSide', () => {
  describe('renders the events links', () => {
    let wrapper;

    const listings = [{
      id: '123',
      slug: 'june-react-meetup',
      title: 'June React Meetup',
      datetime: {
        iso: '2016-06-26T17:00:00+0000',
        date: '26',
        month: '06',
        monthSym: 'Jun',
        year: '2016',
      },
    }, {
      id: '456',
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
      wrapper = shallow(
         <LinksListSide links={listings} title='Today' listType='events' />
      );
    });

    it('will have the correct title', () => {
      expect(wrapper.text()).to.contain('Today');
    });

    it('will have the correct link text', () => {
      expect(wrapper.text()).to.contain('June React Meetup');
      expect(wrapper.text()).to.contain('July React Meetup');
    });

    it('will have the correct link', () => {
      expect(wrapper.html()).to.contain('/about-us/events/2016/07/26/july-react-meetup');
    });
  });

  describe('renders the news links', () => {
    let wrapper;

    const news = [{
      id: '1234',
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

    beforeEach(() => {
      wrapper = shallow(
         <LinksListSide links={news} title='Recent News' listType='news' />
      );
    });

    it('will have the correct title', () => {
      expect(wrapper.text()).to.contain('Recent News');
    });

    it('will have the correct link text', () => {
      expect(wrapper.text()).to.contain('Fortnum’s are commerce innovation leaders');
    });

    it('will have the correct link', () => {
      expect(wrapper.html()).to.contain('/about-us/news/2016/04/13/fortnums-are-commerce-innovation-leaders');
    });
  });
});
