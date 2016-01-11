import React from 'react';
import Paragraph from './paragraph';
import Link from './link';
import Strong from './strong';
import Title1 from './title1';
import Title2 from './title2';
import Title3 from './title3';
import Content from '../content';

export default class ComponentRenderer extends React.Component {
  build (schema) {
    const componentIndex = {
      Paragraph: Paragraph,
      Link: Link,
      Strong: Strong,
      Content: Content,
      Title1: Title1,
      Title2: Title2,
      Title3: Title3
    };
    const componentName = schema.type;
    const Component = componentIndex[componentName];
    const componentChildren = schema.props.children;

    let text = null;
    let childNodes = [];

    if (componentChildren instanceof Array) {
      childNodes = componentChildren.map((child, index) => {
        if (child.type && componentIndex[child.type]) {
          child.props.key = index;
          return this.build(child);
        }
        return child;
      });
    } else if (typeof componentChildren === 'string') {
      text = componentChildren;
    }

    return React.createElement(Component, schema.props, text || childNodes);
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
