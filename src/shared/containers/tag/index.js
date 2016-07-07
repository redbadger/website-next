import React, { Component } from 'react';
import { fetchTaggedDocs } from '../../actions/tagged-docs';
import fetch from '../../util/fetch-proxy';
import { connect } from 'react-redux';
import TagContainer from './container';

export class Tag extends Component {
  static fetchData = fetchTaggedDocs(fetch());

  render() {
    const { tag, taggedDocs } = this.props;

    return (
      <TagContainer
        tag={tag}
        allEvents={taggedDocs.allEvents}
        allNews={taggedDocs.allNews} />
    );
  }
}

function mapStateToProps(state, { routeParams }) {
  return {
    tag: routeParams.tag,
    taggedDocs: state.taggedDocs,
  };
}

export default connect(
  mapStateToProps
)(Tag);
