import {baseUrl, debug} from '../common/js/constant';
import axios from 'axios';

/**
 * 获取常用网站
 * @returns {Promise<any>}
 */
export function getOftenVisitWebsiteList() {
  const url = debug ? '/api/getOftenVisitWebsiteList' : '待定';

  return axios.get(url, {
    params: {url: `${baseUrl}friend/json`}
  }).then((res) => { // res是本次请求返回的整个响应数据，包含状态码status
    return Promise.resolve(res.data); // 只要响应体，顺便转为 Promise 对象
  });
}
