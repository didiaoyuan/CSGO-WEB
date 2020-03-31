import { message } from 'antd';
import { fakeSubmitForm,queryBoards } from './service';
import {router} from 'umi';

const Model = {
  namespace: 'addTopicPage',
  state: {
    list:[],
  },
  effects: {
    *submitRegularForm({ payload }, { call }) {
      const response = yield call(fakeSubmitForm, payload);
      if(response.status==='ok'){
        router.replace('/listsearcharticles');
        message.success('提交成功');
      }
    },
    *getBoards(_, { call,put }) {
      const response = yield call(queryBoards);
      console.log(response);
      yield put({
        type:'refreshBoards',
        payload: response,
      });
    },
  },
  reducers:{
    refreshBoards(state,action){
        return { ...state, list: action.payload };
    }
  }
};
export default Model;
