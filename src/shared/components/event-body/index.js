/* eslint react/no-set-state: 0 */
import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import styles from './styles.css';

const getStyle = () => styles.editor;

export default class EventBody extends Component {

  static propTypes = {
    options: React.PropTypes.arrayOf(React.PropTypes.string)
  };

  constructor (props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
          {this.props.options.map((option, i) =>
            <button key={i} onClick={this.onStyleChange.bind(this)(option)}>{this.capitalize(option)}</button>
          )}
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
