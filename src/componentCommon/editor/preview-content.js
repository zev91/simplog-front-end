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
      doms: null
    }
    this.debounceGetContent = debounce(this.onContentChange,200);
    this.debounceGetContent();
  }
  
  componentWillReceiveProps(nextProps){
    this.debounceGetContent();
  }

  onContentChange = () => {
    const { code } = this.props;
    console.log({code})
    this.setState({
      doms: marked(code, { breaks: true })
    })
  }
  render(){
    const { getPreviewRef } = this.props;
    const { doms } = this.state;
    console.log(doms)

    return (
      <div className='preview-content' ref={getPreviewRef}>
        <div dangerouslySetInnerHTML={{ __html: doms }} />
      </div>
    )
  }
}
