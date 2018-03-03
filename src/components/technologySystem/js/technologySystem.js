import {baseUrl, debug} from '../../../common/js/constant';
import axios from 'axios';

/**
 * 获取体系结构
 * @param currentPage 页码，从1开始
 * @returns {Promise<any>}
 */
export function getTechnologySystem() {
  const url = debug ? '/api/getTechnologySystem' : '待定';
  return axios.get(url, {
    params: {url: `${baseUrl}tree/json`}
  }).then((res) => { // res是本次请求返回的整个响应数据，包含状态码status
    return Promise.resolve(res.data); // 只要响应体，顺便转为 Promise 对象
  });
}
