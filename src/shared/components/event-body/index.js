/* eslint react/no-set-state: 0 */
import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
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

  onStyleChange (style) {
    return (function (event) {
      event.preventDefault();
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style.toUpperCase()));
    }).bind(this);
  }

  render () {
    return (
      <div className={styles.editContainer}>
        <div className={styles.editButtons}>
          <button onClick={this.onStyleChange.bind(this)("bold")}>Bold</button>
          <button onClick={this.onStyleChange.bind(this)("italic")}>Italic</button>
        </div>
        <Editor
            blockStyleFn={getStyle}
            editorState={this.state.editorState}
            onChange={this.onChange}
            suppressContentEditableWarning
        />
      </div>
    );
  }
}
