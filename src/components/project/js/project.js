import {baseUrl, debug} from '../../../common/js/constant';
import axios from 'axios';

/**
 * 获取项目分类结构
 * @param currentPage 页码，从1开始
 * @returns {Promise<any>}
 */
export function getProjectTree() {
  const url = debug ? '/api/getProjectTree' : 'http://www.luogjy.xyz/api/getProjectTree';
  return axios.get(url, {

    params: {url: `${baseUrl}project/tree/json`}
  }).then((res) => { // res是本次请求返回的整个响应数据，包含状态码status
    return Promise.resolve(res.data); // 只要响应体，顺便转为 Promise 对象
  });
}

/**
 * 获取项目列表
 * @param currentPage 页码，从1开始
 * @param cid 分类的id
 * @returns {Promise<any>}
 */
export function getProjectList(currentPage, cid) {
  const url = debug ? '/api/getProjectList' : 'http://www.luogjy.xyz/api/getProjectList';
  return axios.get(url, {
    params: {url: `${baseUrl}project/list/${currentPage}/json?cid=${cid}`}
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
