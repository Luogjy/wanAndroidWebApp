import originJSONP from 'jsonp'; // npm install jsonp
/**
 * 把jsonp封装成Promise
 * @param url 地址
 * @param data 参数
 * @param option 对应jsonp库的option （https://github.com/webmodules/jsonp）
 * @returns {Promise<any>}
 */
export default function jsonp(url, data, option) {
  // 问号不存在就加个问号(因为说明这个url自己还没有任何参数)，否则加&
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  if (url.substring(url.length - 1) === '?') { // 如果最后一个字符为问号
    url = url.substring(0, url.length - 1);
  }
  return new Promise((resolve/* 成功时调用 */, reject/* 失败时调用 */) => {
    // jsonp库的函数调用，参考 https://github.com/webmodules/jsonp
    originJSONP(url, option, (err, data) => {
      console.log(data);
      reject(err);
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    });
  });
}

/**
 * 将data解析为url字符串
 * @param data
 * @returns {string}
 */
function param(data) {
  let url = '';
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${value ? encodeURIComponent(value) : ''}`;
  }
  return url ? url.substring(1) : ''; // 从索引1 开始截取字符串到结尾
}
