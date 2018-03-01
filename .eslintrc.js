// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    /*
      "off"或者0，不启用这个规则
      "warn"或者1，出现问题会有警告
      "error"或者2，出现问题会报错
      规范细则 https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
    */
    'eol-last': 0, // 文件末尾强制换行
    'space-before-function-paren': 0, // 函数括号前是否空格
    'semi': 0,
    'indent': 0
  }
};
