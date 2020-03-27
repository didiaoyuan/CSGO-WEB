import {queryCommentList} from "./service";

const Model = {
  namespace: 'mySelfModel',
  state:{
    list:[],
  },
  effects:{
    *fetch(_,{call,put}){
      const response = yield call(queryCommentList);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers:{
      queryList(state,action){

        return {...state, list: action.payload};
      },
  },
};
export default Model;
