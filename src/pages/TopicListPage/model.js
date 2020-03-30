import {queryTopics,removeTopics} from './service';

const MyModel = {
  namespace: 'topicListModel',
  state: {
    list: [],
  },
  effects: {
    *getTopicList(_, { call, put }) {
      const response = yield call(queryTopics);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *removeTopic({payload},{call, put}){
      let response = yield call(removeTopics,payload);
      if(response.status==='ok'){
        response  = yield call(queryTopics);
      }
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    }
  },
  reducers: {
    queryList(state, action) {
      console.log(action.payload)
      return { ...state, list: action.payload };
    }
  },
};
export default MyModel;
