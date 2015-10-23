import React from 'react';
import EmbeddedGist from '../embeddedGist';

export default class ComponentRenderer extends React.Component {

  static propTypes = {
    schema: React.PropTypes.array.isRequired,
  };

  render() {
    const tree = this.props.schema.map((schema, index) => {
      const { type, name, data, attribs, children } = schema;

      const Name = name;

      if (type === 'text') {
        const gistInfo = /\[gist id="([^"]+)"( file="([^"]+)")?\]/.exec(data);
        if (gistInfo) {
          return <EmbeddedGist key={index} id={gistInfo[1]} file={gistInfo[3] || undefined} />;
        }

        return <span key={index}>{data}</span>;
      }

      if (type === 'tag') {
        const childrenComponents = <ComponentRenderer key={index} schema={children} />;

        return (
          <Name {...attribs}>
            {childrenComponents}
          </Name>
        );
      }

      console.log(`Undefined schema type ${type}`);
    });

    if (this.props.schema.length > 1) {
      return <div>{tree}</div>;
    } else {
      return tree[0];
    }
  }
}
