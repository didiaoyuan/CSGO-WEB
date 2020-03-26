import { queryCurrent, queryMyList } from './service';

const Model = {
  namespace: 'accountCenter',
  state: {
    currentUser: {},
    list: [],
  },
  effects: {
    *fetchCurrent({payload}, { call, put }) {
      const response = yield call(queryCurrent,payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response.currentUser,
      });
    },

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMyList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    queryList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
