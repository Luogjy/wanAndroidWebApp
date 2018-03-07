import {baseUrl, debug} from '../common/js/constant';
import axios from 'axios';

/**
 * 获取项目分类结构
 * @returns {Promise<any>}
 */
export function getNavDatas() {
  const url = debug ? '/api/getNavDatas' : '待定';

  return axios.get(url, {
    params: {url: `${baseUrl}navi/json`}
  }).then((res) => { // res是本次请求返回的整个响应数据，包含状态码status
    return Promise.resolve(res.data); // 只要响应体，顺便转为 Promise 对象
  });
}
