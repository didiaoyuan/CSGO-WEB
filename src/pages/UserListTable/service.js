import request from '@/utils/request';

export async function queryRule() {
  return request('/my/api/queryUser');
}

export async function removeRule(params) {
  return request('/my/api/deleteUser', {
    method: 'POST',
    data: params,
  });
}


export async function addRule(params) {
  return request('/my/api/addUser', {
    method: 'POST',
    data: params,
  });
}


export async function updateRule(params) {
  return request('/my/api/updateUser', {
    method: 'POST',
    data: params,
  });
}

