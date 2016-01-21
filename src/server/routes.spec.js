import Routes from './routes';
import React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import 'sinon-as-promised';

describe('Routes', () => {

  describe('instance', () => {

    let routeHandler;
    let req;
    let res;
    let workable;
    let match;

    beforeEach(() => {
      req = {};
      res = {
        send: () => res,
        status: () => res
      };
      workable = {
        getJobs: stub()
      };
      workable.getJobs.resolves([]);
      match = stub();
      match.resolves(<div/>);
      routeHandler = Routes(workable, match);
    });

    describe('when workable and match resolve', () => {

      it('calls res.send with a string', (done) => {
        res.send = function (value) {
          expect(value).to.be.a('string');
          done();
        };
        routeHandler(req, res);
      });

    });

    describe('when workable rejects', () => {

      beforeEach(() => {
        workable.getJobs.rejects({});
      });

      it('calls res.send with a string', (done) => {
        res.send = function (value) {
          expect(value).to.be.a('string');
          done();
        };
        routeHandler(req, res);
      });

      it('calls res.status with 500', (done) => {
        res.status = function (value) {
          expect(value).to.equal(500);
          done();
        };
        routeHandler(req, res);
      });

    });

    describe('when match rejects', () => {

      beforeEach(() => {
        match.rejects({});
      });

      it('calls res.send with a string', (done) => {
        res.send = function (value) {
          expect(value).to.be.a('string');
          done();
        };
        routeHandler(req, res);
      });

      it('calls res.status with 500', (done) => {
        res.status = function (value) {
          expect(value).to.equal(500);
          done();
        };
        routeHandler(req, res);
      });

    });

  });
});
