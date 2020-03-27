import request from '@/utils/request';

export async function queryCommentList() {
  return request(' /api/queryCommentList ');
}
