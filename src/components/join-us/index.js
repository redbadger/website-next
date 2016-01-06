import React, {Component} from 'react';
import classnames from 'classnames';
import Content from '../content';
import * as backgrounds from '../utils/background.css';

class JoinUs extends Component {
  render () {
    return (
      <div className={classnames(backgrounds.craft, backgrounds.paperTear)}>
        <Content>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <p>Paragraph. Lorem ipsum do sol.</p>
        </Content>
      </div>
    );
  }
}

export default JoinUs;
