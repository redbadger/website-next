/* eslint react/no-set-state: 0 */
import React, { Component } from 'react';
import { Editor } from 'draft-js';
import styles from './styles.css';

const getStyle = () => styles.editor;

export default class EventBody extends Component {

  static propTypes = {
    editorState: React.PropTypes.shape({}),
    onChange: React.PropTypes.func,
    onStyleChange: React.PropTypes.func,
    options: React.PropTypes.arrayOf(React.PropTypes.string)
  };

  capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render () {
    return (
      <div className={styles.editContainer}>
        <div className={styles.editButtons}>
          {this.props.options.map((option, i) =>
            <button key={i} onClick={this.props.onStyleChange(option)}>{this.capitalize(option)}</button>
          )}
        </div>
        <Editor
            blockStyleFn={getStyle}
            editorState={this.props.editorState}
            onChange={this.props.onChange}
            suppressContentEditableWarning
        />
      </div>
    );
  }
}
