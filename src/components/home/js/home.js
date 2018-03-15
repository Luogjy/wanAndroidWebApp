import {baseUrl, debug} from '../../../common/js/constant';
import axios from 'axios';

/**
 * 获取文章列表
 * @param currentPage 页码，从1开始
 * @returns {Promise<any>}
 */
export function getArticleList(currentPage) {
  const url = debug ? '/api/getArticleList' : 'http://www.luogjy.xyz/api/getArticleList';
  return axios.get(url, {
    params: {url: `${baseUrl}article/list/${currentPage - 1}/json`}
  }).then((res) => { // res是本次请求返回的整个响应数据，包含状态码status
    return Promise.resolve(res.data); // 只要响应体，顺便转为 Promise 对象
  });
}

export function getBannerList() {
  const url = debug ? '/api/getBannerList' : 'http://www.luogjy.xyz/api/getBannerList';
  return axios.get(url, {
    params: {url: `${baseUrl}banner/json`}
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
