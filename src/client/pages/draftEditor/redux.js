import * as enRedux from 'utils/redux';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();
export const actions = {
  getData: action({
    type: 'editorDraftPage.getData',
    action: (http,dispatch,getstate) => {
      return http.get('https://www.fastmock.site/mock/b6100fac0c7cd8fd548cee0fa0035255/crm/todo-list')
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  getPage: action({
    type: 'editorDraftPage.getPage',
    action: () => ({
      tdk: {
        title: '草稿',
        keywords: '前端技术江湖 草稿',
        description: '前端技术江湖'
      }
    }),
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  getInitialData: action({
    type: 'editorDraftPage.getInitialData',
    action: async (http,dispatch) => {

      const res = await dispatch(actions.getList());
      const page = await dispatch(actions.getPage());
      return ({
        list: res.data,
        page
      })
    },
    handler: (state, result) => {
      return {
        ...state,
        list: result.list,
        page: result.page
      }
    }
  },reducerHandler),
};

injectReducer({ key: 'editorDraftPage', reducer: reducerHandler({list:[],page:{}})});


