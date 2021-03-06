import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import composeHOC from 'src/utils/composeHOC';
import emitter from 'src/utils/events';
import { actions } from 'src/client/pages/user-center/redux';
import Skeleton from '@material-ui/lab/Skeleton';
import Empty from 'src/componentCommon/empty';

const HocWrap = SourceComponent => {
  return class HocComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        datas: {
          datas: [],
          page: {}
        },
        loading: true,
        followType: ''
      }
    }

    async componentDidMount() {
      this.getDatas(1);
      emitter.addListener('scrollToBottom', this.loadMore);
    }

    changeFollowType = followType => {
      this.setState({
        datas: {
          datas: [],
          page: {}
        },
        loading: true,
        followType
      }, () => this.getDatas(1))
    }

    loadMore = () => {
      const { page } = this.state.datas;
      if (!page.nextPage) return;

      this.getDatas(page.nextPage);
    }

    getDatas = async pageNo => {
      const { params } = this.props.match;
      const { datas } = this.state.datas;
      const { followType } = this.state;
      const queryData = { id: params.id, pageNo };

      if (followType) {
        queryData['followType'] = followType;
      }
      const res = await this.props[SourceComponent.method](queryData);
      this.setState({
        datas: {
          datas: [...datas, ...res.data.datas],
          page: res.data.page
        },
        loading: false
      });
    };

    refreshDatas = async () => {
      const { params } = this.props.match;
      const res = await this.props[SourceComponent.method]({ id: params.id, pageNo: 1 });
      this.setState({
        datas: res.data
      });
    }

    componentWillUnmount() {
      emitter.removeListener('scrollToBottom', this.loadMore);
    }
    render() {
      const { datas, loading, followType } = this.state;
      return (
        loading
          ?
          <div className='user-center-skeleton-wrap' style={{ padding: '12px 14px', background: '#fff' }}>
            <div style={{ display: 'flex', alinItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
              <Skeleton variant="circle" width={32} height={32} />
              <Skeleton variant="text" width='calc(100% - 42px)' height={28} />
            </div>
            <Skeleton variant="text" width={200} height={28} />

            <Skeleton variant="rect" width='100%' height={128} />
            <Skeleton variant="text" width={132} height={32} />
          </div>
          :
          (datas.datas.length ? <SourceComponent {...this.props} {...datas} changeFollowType={this.changeFollowType} followType={followType} refreshDatas={this.refreshDatas} /> : <Empty />)
      )
    }
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
});


export default SourceComponent => (
  composeHOC(
    withRouter,
    connect(mapStateToProps, actions)
  )(HocWrap(SourceComponent))
)