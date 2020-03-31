import { queryBoardList,addBoardsStar } from './service';
import { message} from 'antd';

const Model = {
  namespace: 'listSearchBoards',
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
    *addBoardStar({ payload }, { call }) {
      console.log("请求参数",payload)
      const response = yield call(addBoardsStar, payload);
      if(response.status ==='ok'){
        message.success("关注成功");
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
