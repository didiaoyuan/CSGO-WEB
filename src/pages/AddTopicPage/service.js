import request from '@/utils/request';

// export async function fakeSubmitForm(params) {
//   return request('/api/forms', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function fakeSubmitForm(params) {
  return request('/my/api/addTopic', {
    method: 'POST',
    data: params,
  });
}

export async function queryBoards() {
  return request('/my/api/listBoards');
}
