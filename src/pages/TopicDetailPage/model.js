import {addComment,queryComment} from './service';

const MyCommentModel = {
  namespace: 'commentListModel',
  state: {
    list: [],
  },
  effects: {
    *getCommentLit({payload}, { call, put }) {
      const response = yield call(queryComment,payload);
      
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *addComment({payload},{call,put}){
      
      let response = yield call(addComment,payload);
      return response;
      const topicId={
        topicId:payload.topicId
      };
      if(response.status==='ok'){
        response = yield call(queryComment,topicId);
      }
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    }
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    }
  },
};
export default MyCommentModel;
