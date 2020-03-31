import request from '@/utils/request';

export async function queryBoardList(params) {
  return request('/my/api/listBoards', {
    params,
  });
}

export async function addBoard(params) {
  return request('/my/api/addBoard', {
    params,
  });
}

export async function removeBoard(params) {
  return request('/my/api/removeBoard', {
    params,
  });
}


