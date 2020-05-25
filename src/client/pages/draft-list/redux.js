import * as enRedux from 'utils/redux';
import { getInitState } from 'utils/helper';

const { action, createReducer, injectReducer } = enRedux.default;
const reducerHandler = createReducer();

export const actions = {
  getDraftLists: action({
    type: 'draftPage.getPosts',
    action: (http,dispatch,getstate) => {
      return http.get('/api/getDraftLists')
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  getMoreDrafts: action({
    type: 'draftPage.getMoreDrafts',
    action: (params,http,dispatch,getstate) => {
      return http.get('/api/getDraftLists?pageNo='+params.pageNO)
    },
    handler: (state, result) => {
      const newDraftData = JSON.parse(JSON.stringify(state.draftData));
      newDraftData.datas = [...newDraftData.datas, ...result.data.datas];
      newDraftData.page = result.data.page;
      return {
        ...state,
        draftData:newDraftData
      }
    }
  },reducerHandler),

  getPage: action({
    type: 'draftPage.getPage',
    action: () => ({
      tdk: {
        title: '草稿',
        keywords: 'draft',
        description: '极简博客平台'
      }
    }),
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  deletePost: action({
    type: 'draftPage.deletePost',
    action: (id,http) => {
      return http.delete(`/api/posts/${id}`)
    },
    handler: (state, result) => {
      return {
        ...state,
      }
    }
  },reducerHandler),

  updateListt: action({
    type: 'draftPage.updateListt',
    action: id => id,
    handler: (state, id) => {
      return {
        ...state,
        draftData: {...state.draftData,datas: state.draftData.datas.filter(data => data._id !== id)}
      }
    }
  },reducerHandler),

  getInitialData: action({
    type: 'draftPage.getInitialData',
    action: async (http,dispatch) => {
      const res = await dispatch(actions.getDraftLists());
      const page = await dispatch(actions.getPage());
      return ({
        draftData: res.data,
        page
      })
    },
    handler: (state, result) => {
      return {
        ...state,
        ...result
      }
    }
  },reducerHandler),
};

let initState = {
  key: 'draftPage',
  state: {draftData:{datas:[],page:{}},page:{}}
};

injectReducer({ key: initState.key, reducer: reducerHandler(getInitState(initState))});



