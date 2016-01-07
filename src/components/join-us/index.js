import React, {Component} from 'react';
import classnames from 'classnames';
import Content from '../content';
import Embed from '../embed';
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
        <Embed src="<iframe src='https://player.vimeo.com/video/110925126' width='500' height='281' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>" />
      </div>
    );
  }
}

export default JoinUs;
