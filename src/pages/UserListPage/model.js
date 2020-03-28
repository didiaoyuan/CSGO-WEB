import {queryRule} from './service';

const MyModel = {
  namespace: 'userListPage1',
  state: {
    list: [],
  },
  effects: {
    *getUserTable(_, { call, put }) {
      const response = yield call(queryRule);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      console.log(action.payload)
      return { ...state, list: action.payload };
    }
  },
};
export default MyModel;
