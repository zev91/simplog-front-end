import { reducer as listPage } from 'src/client/pages/list/redux';

//关于页面的子 reducer
import { reducer as homePage } from 'src/client/pages/home/redux';

//合并多个 reducer
import {combineReducers } from 'redux';

export default combineReducers({
    listPage,
    homePage
});