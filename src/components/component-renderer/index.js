import React from 'react';
import Paragraph from './paragraph';
import Link from './link';

export default class ComponentRenderer extends React.Component {
  build (schema) {
    const componentIndex = {
      Paragraph: Paragraph,
      Link: Link
    };
    const componentName = schema.type;
    const Component = componentIndex[componentName];
    const componentChildren = schema.props.children;

    let childNodes = [];

    if (componentChildren instanceof Array) {
      childNodes = componentChildren.map((child, index) => {
        if (child.type && componentIndex[child.type]) {
          child.props.key = index;
          return this.build(child);
        }
        return child;
      });
    }

    schema.props.children = childNodes;

    return React.createElement(Component, schema.props);
  }

  render () {
    return this.build(this.props.schema);
  }
}

ComponentRenderer.propTypes = {
  schema: React.PropTypes.shape({
    type: React.PropTypes.string
  }).isRequired
};
