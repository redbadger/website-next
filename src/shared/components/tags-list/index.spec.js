import { expect } from 'chai';
import React from 'react';
import { render, findAllWithType } from '../../test-helper';
import TagsList from './';

describe('Compoonent: TagsList', () => {
  describe('#render', () => {
    let props;

    beforeEach(() => {
      props = {
        tagsList: ['react', 'red badger'],
      };
    });

    it('renders a list of tags', () => {
      const component = render(<TagsList tagsList={props.tagsList} />);
      const listItems = findAllWithType('li', component);

      expect(listItems.length).to.equal(2);

      listItems.forEach((element, index) => {
        const tag = props.tagsList[index];
        const link = element.props.children;

        expect(link.props.href).to.equal('#');
        expect(link.props.title).to.equal(`See more content related to ${tag}`);
        expect(link.props.children).to.equal(tag);
      });
    });

    it('returns null when the tags array is empty', () => {
      props.tagsList = [];
      const tagsList = new TagsList(props);

      expect(tagsList.render()).to.equal(null);
    });

    it('throws when the tags array is omitted', () => {
      expect(() => render(<TagsList />)).to.throw();
    });
  });
});
