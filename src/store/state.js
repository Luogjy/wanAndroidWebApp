const state = {
  touchBottom: false, // 触底
  refresh: false, // 点击了头部刷新按钮
  loading: 0, // 主动调起的请求任务数，计数器加1或加-1
  searchPageIsShowing: false,
  // 在其他地方传给体系页的二级分类，结构为  {'chapterId': 294, 'chapterName': '完整项目'}，在体系页拿到值后就马上置null
  defaultTwoChapter: null
};

export default state;
