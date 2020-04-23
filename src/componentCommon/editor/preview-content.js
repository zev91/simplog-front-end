import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import languageList from './language-list';
import { debounce } from 'src/utils/helper';

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function (code) {
    return hljs.highlightAuto(code, languageList).value;
  }
});

export default class PreviewContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      doms: marked(props.code || '', { breaks: true })
    }
    this.debounceGetContent = debounce(this.onContentChange,200);
  }
  
  componentWillReceiveProps(nextProps){
    this.debounceGetContent();
  }
  componentWillUnmount(){
    this.debounceGetContent = null;
  }

  onContentChange = () => {
    const { code } = this.props;
    this.setState({
      doms: marked(code || '', { breaks: true })
    })
  }
  render(){
    const { getPreviewRef, className, code} = this.props;
    const { doms } = this.state;
    return (
      <div className={`preview-content ${className}`} ref={getPreviewRef}>
        <div className='preview-content-html'>
          <div dangerouslySetInnerHTML={{ __html: doms }} />
        </div>
        <div className='bottom-tool-bar preview-tool-bar'>
            <div>预览</div>
            <div>{code ? code.length : 0}字</div>
          </div>
      </div>
    )
  }
}
