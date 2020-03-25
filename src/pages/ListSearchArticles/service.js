import request from '@/utils/request';

export async function queryFakeList(params) {
  return request('/my/api/listTopics', {
    params,
  });
}
