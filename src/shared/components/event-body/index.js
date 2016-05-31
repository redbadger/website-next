/* eslint react/no-set-state: 0 */
import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import styles from './styles.css';

const getStyle = () => styles.editor;

export default class EventBody extends Component {

  static propTypes = {
  };

  constructor (props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  render () {
    return (
      <Editor
          blockStyleFn={getStyle}
          editorState={this.state.editorState}
          onChange={this.onChange}
      />
    );
  }
}
