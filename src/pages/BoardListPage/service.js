import request from '@/utils/request';

export async function queryBoardList(params) {
  return request('/my/api/listBoards', {
    params,
  });
}

export async function addBoardsStar(params) {
  return request('/my/api/addBoardsStar', {
    params,
  });
}
