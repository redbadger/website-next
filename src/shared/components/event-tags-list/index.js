import React, { Component } from 'react';

export default class EventTagsList extends Component {
  static propTypes = {
    tagsList: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  };

  render() {
    if (this.props.tagsList.length === 0) return null;

    return (
      <div>
        <ul>
          { this.props.tagsList.map((tag, index) => (
            <li key={index}>
              <a href="#"
                title={`See more events related to ${tag}`}>{tag}</a>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}
