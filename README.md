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

```javascript
//store/store.jsx
//需要共享的数据内容(下面的a、b、c是示例)
import {createStore} from 'redux'
import reducer from '../reducer' 
const initValue={
    'a':false,
    'b':'100',
    'c':'test'
}
const store=createStore(reducer,initValue)
export default store
```
```javascript
//action/action.jsx
//把数据从应用传到 store 的方法。
//一般来说你会通过 store.dispatch() 将 action 传到 store。
//action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。
export const a='aaa';
export const b='bbb';

export const setA=()=>({
    type:a
  }
);
export const setB=()=>({
    type:b
  }
);
```
#### 6、配置代理
[官方文档](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually)
6.1、安装依赖
```
npm install http-proxy-middleware --save
```
6.2、新建/src/setupProxy.js
```javascript
const proxy = require('http-proxy-middleware');
//注册代理
module.exports = function(app) {
    app.use(proxy('/v1',{ //实例
            target: 'http://localhost:1234/' 
        })
    );
};
```
您无需在任何位置导入此文件,它在启动开发服务器时自动注册。
#### 7、使用axios.js
7.1、安装依赖
```
npm install axios --save
```
7.2、