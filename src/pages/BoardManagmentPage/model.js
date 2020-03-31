import { queryBoardList,addBoard,removeBoard } from './service';
import { message } from 'antd';

const Model = {
  namespace: 'listCardList',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBoardList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *addBoard({ payload }, { call, put }) {
      let response = yield call(addBoard, payload);
      if(response.status==='ok'){
        message.success("新增板块成功");
        response = yield call(queryBoardList);
        yield put({
          type: 'queryList',
          payload: Array.isArray(response) ? response : [],
        });
      }
    },

    *removeBoard({ payload }, { call, put }) {
      let response = yield call(removeBoard, payload);
      if(response.status==='ok'){
        message.info("删除成功");
        response = yield call(queryBoardList);
        yield put({
          type: 'queryList',
          payload: Array.isArray(response) ? response : [],
        });
      }
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
