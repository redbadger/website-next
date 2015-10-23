import React from 'react';
import EmbeddedGist from '../embeddedGist';

const componentIndex = {
  embeddedgist: EmbeddedGist,
};

export default class ComponentRenderer extends React.Component {

  static propTypes = {
    schema: React.PropTypes.array.isRequired,
  };

  render() {
    const tree = this.props.schema.map((schema, index) => {
      const { type, name, data, attribs, children } = schema;
      if (attribs) { delete attribs.style; } // some elements have custom styling, remove it for now since it breaks rendering

      if (type === 'text') {
        return <span key={index}>{data}</span>;
      }

      if (type === 'tag') {
        const childrenComponents = <ComponentRenderer key={index} schema={children} />;

        if (componentIndex[name]) {
          const Name = componentIndex[name];
          return <Name {...attribs} children={children.length ? childrenComponents : undefined} key={index} />
        }

        const Name = name;
        return <Name {...attribs} children={children.length ? childrenComponents : undefined} key={index} />;
      }

      console.error(`Undefined schema type ${type}`, schema);
    });

    if (this.props.schema.length > 1) {
      return <div>{tree}</div>;
    } else {
      return tree[0];
    }
  }
}
