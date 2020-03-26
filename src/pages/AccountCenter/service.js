import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryFakeList(params) {
  return request('my/api/fake_list', {
    params,
  });
}
