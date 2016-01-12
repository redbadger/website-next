import Video from './index';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

let renderer;
let rendered;

describe('Video', () => {
  beforeEach(() => {
    renderer = TestUtils.createRenderer();
  });

  it('adds an iframe', () => {
    renderer.render(<Video id="1" type="youtube" />);
    rendered = renderer.getRenderOutput();
    expect(rendered.props.children.type).to.equal('iframe');
  });

  it('adds a youtube iframe if the type is youtube', () => {
    renderer.render(<Video id="1" type="youtube" />);
    rendered = renderer.getRenderOutput();
    expect(rendered.props.children.props.src).to.equal('https://www.youtube.com/embed/1');
  });

  it('adds a vimeo iframe if the type is vimeo', () => {
    renderer.render(<Video id="1" type="vimeo" />);
    rendered = renderer.getRenderOutput();
    expect(rendered.props.children.props.src).to.equal('https://player.vimeo.com/video/1');
  });
});
