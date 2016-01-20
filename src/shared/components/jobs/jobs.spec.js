import { Jobs } from './index';
import React from 'react';
import Note from '../note';
import { render, hasProp, containsOne, findAllWithType, findWithType } from '../../test-helper';
import { expect } from 'chai';

describe('Jobs', () => {

  const listings = [{
    title: 'Title1',
    description: '<p>First paragraph</p><p>Second one</p>'
  }, {
    title: 'Title2',
    description: '<p>Third paragraph</p><p>Fourth one</p>'
  }];
  let result;
  let notes;
  let note;

  before(() => {
    result = render(<Jobs jobs={listings} />);
    notes = findAllWithType(Note, result);
    note = notes[0];
  });

  it('renders two notes', () => {
    expect(notes.length).to.equal(2);
  });

  it('renders the title with link', () => {
    const link = findWithType('a', note);

    expect(hasProp('href', '#')(link)).to.equal(true);
    expect(containsOne('Title1', note)).to.equal(true);
  });

  it('renders the description', () => {
    expect(containsOne('First paragraph', note)).to.equal(true);
    expect(containsOne('Second one', note)).to.equal(true);
  });

});
