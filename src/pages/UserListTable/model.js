import {queryRule, removeRule} from './service';

const MyTableModel = {
  namespace: 'userListTable',
  state: {
    data: [],
  },
  effects: {
    *getUserTable(_, { call, put }) {
      const response = yield call(queryRule);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *removeUser({payload},{call,put}){
      let response = yield call(removeRule,payload);
      if(response.status==='ok'){
         response = yield call(queryRule);
      }
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    }
  },
  reducers: {
    queryList(state, action) {
      return { ...state, data: action.payload };
    }
  },
};
export default MyTableModel;
