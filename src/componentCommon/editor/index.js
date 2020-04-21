import React, { Component, createRef } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import PreviewContent from './preview-content';
import { IconButton } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PublishIcon from '@material-ui/icons/Publish';
import { debounce } from 'src/utils/helper';
import css from './style.scss';
import Toast from 'src/componentCommon/toast'

let CodemirrorEditor
if (typeof navigator !== 'undefined') {
  const { Controlled } = require('react-codemirror2');
  CodemirrorEditor = Controlled;
  require('codemirror/mode/markdown/markdown');
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.leftEditorRef = createRef();
    this.debounceSavePost = debounce(this.handlerSavePost,1000);

    this.state = {
      title: props.initialData.post.title,
      code: props.initialData.post.body
    };
  }

  componentDidMount(){
    this.leftEditor = document.getElementsByClassName('CodeMirror-scroll')[0];
    this.leftEditorChild = document.getElementsByClassName('CodeMirror-sizer')[0];
    this.rightPreviewChild = this.rightPreview.firstChild.firstChild;
  }

  containerScroll = () => {
    const leftEditorTop = this.leftEditor.scrollTop;
    const leftEditorHeight = this.leftEditor.getBoundingClientRect().height;
    const leftEditorChildHight = this.leftEditorChild.getBoundingClientRect().height;
    const scrollTopScale = leftEditorTop / (leftEditorChildHight - leftEditorHeight)

    const rightPreviewHeight = this.rightPreview.getBoundingClientRect().height;
    const rightPreviewChildHight = this.rightPreviewChild.getBoundingClientRect().height;

    this.rightPreview.firstChild.scrollTop = scrollTopScale * (rightPreviewChildHight - rightPreviewHeight)
  }

  getPreviewRef = ref => {
    this.rightPreview = ref;
  }

  handlerFullscreen = () => {
    this.setState({
      fold: !this.state.fold
    })
  }
  insertContent = (url) => {
    this.leftEditorRef.current.editor.replaceSelection( `![](${url})`);
  }

  uploadFileChange = async e => {

    console.log(this.props)
    const formData = new FormData();
    const image = e.target.files[0];
    formData.append('images', image);
    // Toast.loading('上传中');
    const res =  await this.props.uploadImage(formData);
    
    if(res && res.success){
      this.insertContent(res.data.url);
    }
  }

  handlerPostContentChange = code => {
    this.setState({code});
    this.debounceSavePost();
  }

  handlerTitleChange = e => {
    this.setState({title: e.target.value})
    this.debounceSavePost();
  }

  handlerSavePost = () => {
    const { match, history } = this.props;
    const { title, code } = this.state;

    if(match.params.id === 'new'){
      const status = 'DRAFT';
      this.props.createPost({
        title, 
        body:code,
        status
      }).then(res =>{
        if(res && res.success){
          history.replace({pathname:`/editor/draft/${res.data.id}`})
        }
      });
      return;
    }

    this.props.updatePost({
      id: match.params.id,
      title, 
      body:code
    }).then(res =>{
      if(res && res.success){
        // history.replace({pathname:`/editor/draft/${res.data.id}`})
      }
    });

  }

  render() {
    const { fold, code, title, preContent } = this.state;
    return [
      <header key='header' className='editor-header'>
        <input 
          onChange={this.handlerTitleChange} 
          value={title}
          type="text" 
          placeholder="输入文章标题..." 
          spellCheck="false" 
          className='editor-title' 
        />
        <div>已更新至 草稿箱</div>
      </header>,
      <div key='main' className='editor-main'>
        <div className='editor-box'>
          {
            typeof navigator !== 'undefined' 
            ? 
            // <div contentEditable="plaintext-only" className='raw-editor-content' onInput={preContent}>{code}</div>
            <CodemirrorEditor
              className={fold ? 'editor-fullscreen' : ''}
              ref={this.leftEditorRef}
              onScroll={this.containerScroll.bind(this, 1)}
              value={this.state.code}
              options={{
                mode: 'markdown',
                theme: 'solarized',
                highlightFormatting: true,
                fullScreen:true,
                lineWrapping: true
              }}
              onBeforeChange={(editor, data, rawcode) => {this.setState({code:rawcode})}}
              onChange={(editor, data, rawcode) => this.handlerPostContentChange(rawcode) }
            />
            :
            <div contentEditable="plaintext-only" className='raw-editor-content' onInput={preContent}>{code}</div>
          }

          <div className={`bottom-tool-bar editor-tool-bar ${fold ? 'toLeft' : 'toRight'}`}>
            <div className='upload-content'>
            <input accept="image/*" id="image-button-file" type="file" onChange={ this.uploadFileChange }/>
            <label htmlFor="image-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <ImageIcon />
              </IconButton>
            </label>
            </div>
            <IconButton className='fullscreen' onClick={this.handlerFullscreen}>
              <PublishIcon/>
            </IconButton>
          </div>
        </div>
        <PreviewContent getPreviewRef={this.getPreviewRef} code={code} className={fold ? 'fold' : ''}/>
      </div>
    ]
  }
}

export default withStyles(css)(Editor)








