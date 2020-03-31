import request from '@/utils/request';

export async function queryTopicList(params) {
  return request('/my/api/listTopics', {
    params,
  });
}
