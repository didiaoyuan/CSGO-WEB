import request from '@/utils/request';

export async function queryCurrent(params) {
  return request('/my/api/currentUser',{
    params,
  });
}
export async function queryMyList(params) {
  return request('/my/api/listUserTopics', {
    params,
  });
}

export async function queryMyBoard(params) {
  return request('/my/api/queryBoardsStar', {
    params,
  });
}


export async function removeBoardsStar(params) {
  return request('/my/api/removeBoardsStar', {
    params,
  });
}
