import match from './match';
import { expect } from 'chai';
import 'sinon-as-promised';
import React from 'react';
import { Route } from 'react-router';

describe('match', () => {

  let testElement = 'Test';
  let TestComponent = () => testElement;
  let routes = (<Route component={TestComponent} path="*" />);

  it('returns a promise', () => {
    expect(match({ routes, location: '/'})).to.be.instanceof(Promise);
  });

  describe('when called with routes and matching location', () => {

    it('resolves to an instance of RouterContext', (done) => {
      match({ routes, location: '/'}).then((element) => {
        expect(element.type.displayName).to.equal('RouterContext');
        done();
      });
    });

  });

  describe('when called bad options', () => {

    it('rejects', (done) => {
      match().catch(() => {
        done();
      });
    });

  });

});
