import {baseUrl, debug} from '../common/js/constant';
import axios from 'axios';

/**
 * 获取导航结构
 * @returns {Promise<any>}
 */
export function getNavDatas() {
  const url = debug ? '/api/getNavDatas' : 'http://luogjytest.top/api/getNavDatas';

  return axios.get(url, {
    params: {url: `${baseUrl}navi/json`}
  }).then((res) => { // res是本次请求返回的整个响应数据，包含状态码status
    return Promise.resolve(res.data); // 只要响应体，顺便转为 Promise 对象
  });
}
