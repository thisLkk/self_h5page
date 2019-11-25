/**
 * 请求转发：与views文件夹一一对应
 */
import request from '@/services/request.js';
// 个人信息
export function getUser(data) {
  return request('/getUser', {
    method: 'post',
    data
  });
}