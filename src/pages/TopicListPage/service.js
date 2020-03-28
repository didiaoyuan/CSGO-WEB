import request from '@/utils/request';

export async function queryTopics() {
  return request('/my/api/queryTopics');
}


export async function removeTopics(params) {
  return request('/my/api/removeTopic',{
    params,
  });
}


