import React, { Component, createRef } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import PreviewContent from './preview-content';
import { IconButton, Button, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PublishIcon from '@material-ui/icons/Publish';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { debounce } from 'src/utils/helper';
import UploadHeaderImage from './upload-header-image';
import PublishPost from './publish-post';
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
    this.debounceSavePost = debounce(this.handlerSavePost, 1000);

    this.state = {
      saveTips: '文章将会被保存至',
      uploading: false,
      title: props.initialData.post.title || '',
      headerBg: props.initialData.post.headerBg,
      code: props.initialData.post.body || '',
      tags: props.initialData.post.tags,
      category: props.initialData.post.category
    };
  }

  componentDidMount() {
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
    this.leftEditorRef.current.editor.replaceSelection(`![](${url}?x-oss-process=style/image-in-post)`);
  }

  uploadFileChange = async e => {
    try {
      const { match } = this.props;
      const formData = new FormData();
      const image = e.target.files[0];
      formData.append('images', image);
      formData.append('postId', match.params.id);
      this.setState({ uploading: true })
      const res = await this.props.uploadImage(formData);

      if (res && res.success) {
        this.insertContent(res.data.url);
      }
    } finally {
      this.setState({ uploading: false });
    }
  }

  handlerPostContentChange = code => {
    this.setState({ code });
    this.debounceSavePost();
  }

  handlerTitleChange = e => {
    document.title = `${this.props.published ? '写文章' : '草稿'}-${e.target.value}`;
    this.setState({ title: e.target.value })
    this.debounceSavePost();
  }

  uploadHeaderImageCb = url => { //上传文章头部大图回调
    this.setState({
      headerBg: url
    }, this.handlerSavePost);
  }

  updatePostAndCb = state => { //更新文章回调
    this.setState(state, this.handlerSavePost);
  }

  handlerSavePost = async () => {
    try {
      const { match, history } = this.props;
      const { title, code, headerBg, tags, category } = this.state;
      this.setState({
        saving: true,
        saveTips: '已保存至'
      });

      if (match.params.id === 'new') {
        const status = 'DRAFT';
        const res = await this.props.createPost({ title, body: code, headerBg, status, tags, category });
        if (res && res.success) {
          history.replace({ pathname: `/editor/draft/${res.data.id}` })
        }
        return;
      }

      await this.props.updatePost({ id: match.params.id, title, body: code, headerBg, tags, category });
    } finally {
      setTimeout(() => this.setState({ saving: false }), 500); //防止提示过快
    }
  }

  publishPost = async () => {
    const { match, history } = this.props;
    const { title, code, headerBg, tags, category } = this.state;
    const res = await this.props.publishPost({ id: match.params.id, title, body: code, headerBg, tags, category });

    if (res && res.success) {
      Toast.success(res.data.message);
      setTimeout(() => {
        location.replace('/post/' + match.params.id);
      }, 1000);
    }
  }

  render() {
    const { uploading, fold, code, title, preContent, saving, saveTips, headerBg, tags, category } = this.state;
    const { userInfo, match } = this.props;

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
        <div className='header-right-area'>
          <div className='save-tips'>
            {saving ? '保存中...' : <div>{saveTips} <Button size="small" variant="outlined">草稿</Button></div>}
          </div>

          <UploadHeaderImage
            headerBg={headerBg}
            uploadHeaderImage={this.props.uploadHeaderImage}
            updatePostAndCb={this.updatePostAndCb}
          />

          <PublishPost
            tags={tags || []}
            saving={saving}
            category={category || ''}
            updatePostAndCb={this.updatePostAndCb}
            publishPost={this.publishPost}
            published={this.props.published}
          />
          <Avatar className='user-avater' src={userInfo.avatar} />

          <Backdrop className='async-loading' open={uploading} >
            <CircularProgress color="primary" />
            <span className='loading-tips'>图片上传中...</span>
          </Backdrop>
        </div>
      </header>,
      <div key='main' className='editor-main'>
        <div className='editor-box'>
          {
            typeof navigator !== 'undefined'
              ?
              <CodemirrorEditor
                className={fold ? 'editor-fullscreen' : ''}
                ref={this.leftEditorRef}
                onScroll={this.containerScroll.bind(this, 1)}
                value={this.state.code}
                options={{
                  mode: 'markdown',
                  theme: 'solarized',
                  highlightFormatting: true,
                  fullScreen: true,
                  lineWrapping: true
                }}
                onBeforeChange={(editor, data, rawcode) => { this.setState({ code: rawcode }) }}
                onChange={(editor, data, rawcode) => this.handlerPostContentChange(rawcode)}
              />
              :
              <div contentEditable="plaintext-only" className='raw-editor-content' onInput={preContent}>{code}</div>
          }

          <div className={`bottom-tool-bar editor-tool-bar ${fold ? 'toLeft' : 'toRight'}`}>
            <div className='upload-content'>
              {
                match.params.id === 'new' && <div style={{ width: 40, height: '100%', position: 'absolute', zIndex: 9, cursor: 'not-allowed' }}></div>
              }
              <input accept="image/*" id="image-button-file" type="file" onChange={this.uploadFileChange} />
              <label htmlFor="image-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <ImageIcon />
                </IconButton>
              </label>
            </div>
            <IconButton className='fullscreen' onClick={this.handlerFullscreen}>
              <PublishIcon />
            </IconButton>
          </div>
        </div>
        <PreviewContent getPreviewRef={this.getPreviewRef} code={code} className={fold ? 'fold' : ''} />
      </div>
    ]
  }
}

export default withStyles(css)(Editor);
