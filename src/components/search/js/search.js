import {baseUrl, debug} from '../../../common/js/constant';
import axios from 'axios';
import storage from 'good-storage'; // localStorage 使用第三方库 https://github.com/ustbhuangyi/storage
/**
 * 获取热词
 * @param currentPage 页码，从1开始
 * @returns {Promise<any>}
 */
export function getHotKey() {
  const url = debug ? '/api/getHotKey' : '待定';
  return axios.get(url, {
    params: {url: `${baseUrl}hotkey/json`}
  }).then((res) => { // res是本次请求返回的整个响应数据，包含状态码status
    return Promise.resolve(res.data); // 只要响应体，顺便转为 Promise 对象
  });
}

/**
 * 搜索
 * @param key 关键字
 * @returns {AxiosPromise}
 */
export function searchByKey(key, currentPage) {
  const url = debug ? '/api/search' : '待定';
  return axios({
    url: url,
    method: 'post',
    // 表单数据
    data: {
      k: key
    },
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      return ret;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 这两个头仅仅是为了传值给devServer用而已，devServer可以从这里拿值作为data
      url: `${baseUrl}article/query/${currentPage - 1}/json`,
      k: encodeURIComponent(key)
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

const SEARCH_HISTORY_KEYS = '__SEARCH_HISTORY_KEYS__';
const SEARCH_HISTORY_KEYS_MAX_LENGTH = 20;

export function getHistoryKeys() {
  return storage.get(SEARCH_HISTORY_KEYS, []);
}

/**
 * 元素插入指定数组
 * @param arr 被操作的数组
 * @param val 要插入的值
 * @param maxLen 数组最大长度
 */
function insertArray(arr, val, maxLen) {
  const index = arr.findIndex((item) => {
    return item === val;
  });
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1); // 从索引index，直接在原数组中删除1个元素
  }
  arr.unshift(val); // 在原数组前面添加
  if (maxLen && arr.length > maxLen) {
    arr.pop(); // 删除原数组最后一个元素
  }
}

/**
 * 保存搜索历史到localStorage
 * @param val 想保存的值
 * @returns {array} 被保存的数组
 */
export function saveSearchKey(val) {
  let searches = storage.get(SEARCH_HISTORY_KEYS, []);
  insertArray(searches, val, SEARCH_HISTORY_KEYS_MAX_LENGTH);
  storage.set(SEARCH_HISTORY_KEYS, searches);
  return searches;
}

export function clearHistoryKey() {
  storage.remove(SEARCH_HISTORY_KEYS);
  return [];
}
