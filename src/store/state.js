const state = {
  touchBottom: false, // 触底
  refresh: false, // 点击了头部刷新按钮
  loading: 0, // 主动调起的请求任务数，计数器加1或加-1
  // searchPageIsShowing: false,
  // 在其他地方传给体系页的二级分类，结构为  {'chapterId': 294, 'chapterName': '完整项目'}，在体系页拿到值后就马上置null
  defaultTwoChapter: null,
  // 在其他地方传给项目页的分类，结构为  {'chapterId': 294, 'chapterName': '完整项目'}，在项目页拿到值后就马上置null
  defaultProjectChapter: null,
// 在文章列表条目打开导航对话框指定的导航分类，结构为  {'id': 281, 'name': '公司博客'}，在对话框拿到值后就马上置null
  defaultOneNavData: null
  // theSearchKey: ''

};

export default state;
