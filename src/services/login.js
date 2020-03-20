import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/my/api/doLogin', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
