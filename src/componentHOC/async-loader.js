import React, { Component } from 'react';
import proConfig from 'src/share/pro-config';

class AsyncLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      COMPT: null
    };
  }

  UNSAFE_componentWillMount() {
    //执行组件加载
    if (!this.state.COMPT) {
      this.load(this.props);
    }
  }


  load(props) {
    this.setState({
      COMPT: null
    });
    //注意这里，返回Promise对象; C.default 指向按需组件
    props.load().then((C) => {
      this.setState({
        COMPT: C.default ? C.default : COMPT
      });
    });
  }

  render() {
    return this.state.COMPT ? this.props.children(this.state.COMPT) : <span>正在加载......</span>;
  }
}

export default loader => {
  const asyncFn = props => (
    <AsyncLoader load={loader}>
      {(Comp) => <Comp {...props} />}
    </AsyncLoader>
  )

  asyncFn[proConfig.asyncComponentKey] = true;
  return asyncFn
}
