import request from '@/utils/request';

export async function queryComment(params) {
  return request('/my/api/queryComment',{
    params,
  });
}

export async function addComment(params) {
  return request('/my/api/addComment', {
    params,
  });
}

