import {baseUrl, debug} from '../../../common/js/constant';
import axios from 'axios';

/**
 * 获取项目分类结构
 * @param currentPage 页码，从1开始
 * @param author 作者名
 * @returns {Promise<any>}
 */
export function getAuthorArticleList(currentPage, author) {
  const url = debug ? '/api/getAuthorArticleList' : 'http://luogjytest.top/api/getAuthorArticleList';

  return axios.get(url, {
    params: {url: `${baseUrl}article/list/${currentPage - 1}/json?author=${author}`}
  }).then((res) => { // res是本次请求返回的整个响应数据，包含状态码status
    return Promise.resolve(res.data); // 只要响应体，顺便转为 Promise 对象
  });
}
