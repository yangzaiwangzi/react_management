## study React
#### 1、框架的结构搭建
可参考[create-react-app官方文档](https://facebook.github.io/create-react-app/)
```
npx create-react-app xxx
cd xxx
npm start
```
下面的操作，可根据项目决定，本项目考虑到后期使用create-redux装饰器（@connet），进行如下操作，目的是打开项目的webpack的配置功能：
```
#本操作为不可逆，慎行，运行之后，项目结构有所改变，该命令也将不在可运行
npm run eject
```
#### 2、改变项目目录结构
根据项目具体内容，本项目主要业务结构如下（项目进行后续还会有变化，下面回介绍）：<br>
- src/
    - components/
    - routers/
        - routerContent.jsx
        - routerLink.js
    - views/
        - 404/
        - test/
        - App.jsx
        - App.scss
    - index.js
    - serviceWorker.js

#### 3、构建路由
可参考[react-router官方文档](https://reacttraining.com/react-router/web/guides/quick-start)
#### 4、使用sass
```
npm install node-sass --save
```
即可
#### 5、使用create-redux
可参考[官方翻译版](https://www.redux.org.cn/docs/react-redux/)  
[参考文章](https://www.cnblogs.com/bax-life/p/8440326.html)
```
    npm install --save react-redux
```
src新建redux文件夹，结构如下：
- redux
    - action
        - action.jsx
    - reducer
        - index.jsx
    - store
        - store.jsx
具体实现情况，不在本文详解，可参阅子文章[用Dome粗解create-redux]()
#### 6、配置代理
[官方文档](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually)
6.1、安装依赖
```
npm install http-proxy-middleware --save
```
6.2、新建/src/setupProxy.js
代码如：/src/setupProxy.js
您无需在任何位置导入此文件,它在启动开发服务器时自动注册。
#### 7、使用axios.js
7.1、安装依赖
```
npm install axios --save
```
7.2、就项目需求对axios进行二次封装
代码如：/src/api/index.js
#### 引入UI插件element-react
[官方文档](https://elemefe.github.io/element-react/#/zh-CN/quick-start)