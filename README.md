#### 简介
这个项目是由网站[玩Android](http://www.wanandroid.com/)提供的接口实现的第三方移动webApp，是一个单页应用，项目完整上线。

感兴趣的同学随意fork或者给个star

#### 技术栈：
* 以Vue为框架，结合了Vue-router、Vuex、axios、ES6
* 样式表使用了Sass预处理器
* 跨域通过服务端代理解决，用nodejs、express、axios写的

#### 项目链接
>~~地址：`http://luogjytest.top`~~ 网站被恶意植入广告了，暂时关掉了，还是得上HTTPS
![Alt text](shotcut/20180604220854.png)


这是个移动端的webApp，建议用手机浏览器打开。

#### 调试
* 编译运行命令(先安装Nodejs)
`npm run dev`
成功后显示 `Your application is running here: http://0.0.0.0:8080`
* 电脑浏览器
打开 `http://localhost:8080`即可，推荐使用Chrome浏览器调试
* 手机浏览器
保证跟电脑同一局域网内，打开`http://你的电脑ip:8080`

#### 使用Cordova把项目打包成apk安装包
0. 使用cordova分支的代码（已经参考https://www.jianshu.com/p/25d797b983cd 配置好了所需代码）
1. 执行`npm install -g cordova`（安装Cordova）
2. 在某文件夹下，执行`cordova create cordovaApp com.cordova.testapp`（创建Cordova项目，生成cordovaApp目录）
3. 在cordovaApp目录下，执行`cordova platform add android`
4. 在wanAndroidWebApp项目下，执行`npm run build`（打包webAPP）
5. 把生成的dist目录下的所有文件替换掉\cordovaApp\www目录下的所有文件
6. 在cordovaApp目录下，执行`cordova build android`（需要翻墙。生成apk安装文件，在\cordovaApp\platforms\android\app\build\outputs\apk\debug）

> [体验apk安装包](https://github.com/Luogjy/wanAndroidWebApp/tree/master/apk)

#### 效果图
![Alt text](shotcut/Screenshot1.jpg)
![Alt text](shotcut/lu1.gif)

#### 声明
* 本项目API均由[玩Android](http://www.wanandroid.com/)提供。
* 本项目仅供学习交流，不可用于任何商业用途。

#### Thanks
* [张鸿洋博客](http://blog.csdn.net/lmj623565791/)
* [玩Android](http://www.wanandroid.com/)

#### 我的博客
[Luogjy](https://segmentfault.com/u/luogjy)
