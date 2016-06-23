import sinon from 'sinon';
import { expect } from 'chai';
import React from 'react';
import { render, findWithType, findAllWithType } from '../../test-helper';
import EventTagsList from './';

describe('Compoonent: EventTagsList', () => {
  describe('#render', () => {
    let props;

    beforeEach(() => {
      props = {
        tagsList: ['react', 'red badger'],
      };
    });

    it('renders a list of tags', () => {
      const component = render(<EventTagsList tagsList={props.tagsList} />);
      const listItems = findAllWithType('li', component);

      expect(listItems.length).to.equal(2);

      listItems.forEach((element, index) => {
        const tag = props.tagsList[index];
        const link = element.props.children;
        expect(link.props.href).to.equal('#');
        expect(link.props.title).to.equal(`See more events related to ${tag}`);
        expect(link.props.children).to.equal(tag);
      });
    });

    it('returns null when the tags array is empty', () => {
      props.tagsList = [];
      const eventTagsList = new EventTagsList(props);
      expect(eventTagsList.render()).to.equal(null);
    });
  });
});
