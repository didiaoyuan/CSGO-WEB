import { queryCurrent, queryMyList,queryMyBoard,removeBoardsStar,queryMyComments,removeMyComments } from './service';
import {message} from 'antd';

const Model = {
  namespace: 'accountCenter',
  state: {
    currentUser: {},
    list: [],
    boardList: [],
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

    *fetchBoards({ payload }, { call, put }) {
      const response = yield call(queryMyBoard, payload);
      yield put({
        type: 'queryBoardList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *fetchComments({ payload }, { call, put }) {
      const response = yield call(queryMyComments, payload);
      yield put({
        type: 'queryMyComments',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *removeComments({ payload }, { call, put }) {
      let response = yield call(removeMyComments, payload);
      if(response.status==='ok'){
        message.success("删除成功");

        const userId={
          userId:Number(JSON.parse(localStorage.getItem('userId'))),
        };

        response = yield call(queryMyComments,userId);
        yield put({
          type: 'queryMyComments',
          payload: Array.isArray(response) ? response : [],
        });
      }
    },

    *removeBoards({ payload }, { call, put }) {
      let response = yield call(removeBoardsStar, payload);
      console.log(response)
      if(response.status==='ok') {
        message.info("取消关注");
        response = yield call(queryMyBoard, payload);
        yield put({
          type: 'queryBoardList',
          payload: Array.isArray(response) ? response : [],
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    queryList(state, action) {
      return { ...state, list: action.payload };
    },

    queryBoardList(state, action) {
      return { ...state, boardList: action.payload };
    },
    queryMyComments(state, action){
      return { ...state, CommentsList: action.payload };
    }
  },
};
export default Model;
