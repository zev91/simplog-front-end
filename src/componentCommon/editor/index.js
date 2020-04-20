import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import PreviewContent from './preview-content';
import css from './style.scss';

let CodemirrorEditor
if (typeof navigator !== 'undefined') {
  const {Controlled } = require('react-codemirror2');
  CodemirrorEditor = Controlled;
  require('codemirror/mode/markdown/markdown');
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {code: '# 标题'};
  }

  containerScroll = () => {
    const leftEditor = document.getElementsByClassName('CodeMirror-scroll')[0];
    const rightPreview = this.rightPreview;

    const leftEditorChild = document.getElementsByClassName('CodeMirror-sizer')[0];
    const rightPreviewChild = rightPreview.firstChild;

    const leftEditorTop = leftEditor.scrollTop;

    const leftEditorHeight = leftEditor.getBoundingClientRect().height;
    const leftEditorChildHight = leftEditorChild.getBoundingClientRect().height;
    const scrollTopScale = leftEditorTop / (leftEditorChildHight - leftEditorHeight)

    const rightPreviewHeight = rightPreview.getBoundingClientRect().height;
    const rightPreviewChildHight = rightPreviewChild.getBoundingClientRect().height;

    rightPreview.scrollTop = scrollTopScale * (rightPreviewChildHight - rightPreviewHeight)
  }

  getPreviewRef = ref => {
    this.rightPreview = ref;
  }

  render() {
    const { code, preContent } = this.state;
    return [
      <header key='header' className='editor-header'>
        <input type="text" placeholder="输入文章标题..." spellCheck="false" className='editor-title' />
      </header>,
      <div key='main' className='editor-main'>
        <div className='editor-box'>
          {
            typeof navigator !== 'undefined' 
            ? 
            <CodemirrorEditor
              ref={this.leftEditor}
              onScroll={this.containerScroll.bind(this, 1)}
              value={this.state.code}
              options={{
                mode: 'markdown',
                theme: 'solarized',
                highlightFormatting: true,
                fullScreen:true,
              }}
              onBeforeChange={(editor, data, rawcode) => {this.setState({code:rawcode})}}
              onChange={(editor, data, rawcode) => this.setState({code: rawcode})}
            />
            :
            <div contentEditable="plaintext-only" className='raw-editor-content' onInput={preContent}>{code}</div>
          }
        </div>
        <PreviewContent getPreviewRef={this.getPreviewRef} code={code}/>
      </div>
    ]
  }
}

export default withStyles(css)(Editor)








