import request from '@/utils/request';

export async function fakeRegister(params) {
  console.log(params);
  alert("123")
  return request('/my/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function sendEmail(params) {
  return request('/my/api/sendEmail', {
    method: 'POST',
    data: params,
  });
}
