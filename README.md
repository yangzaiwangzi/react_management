
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
根据项目具体内容，本项目主要业务结构如下（项目进行后续还会有变化，下面回介绍）：  
- src/
    - api/
    - components/
    - routers/
        - routerContent.jsx
        - routerLink.js
    - views/
        - App.jsx
        - App.scss
    - index.js
    - serviceWorker.js
    - setupProxy.js
#### 3、构建路由
可参考[react-router官方文档](https://reacttraining.com/react-router/web/guides/quick-start)
#### 4、使用sass
```
npm install node-sass --save
```
即可
#### 5、使用create-redux
可参考[官方翻译版](https://www.redux.org.cn/docs/react-redux/)
[参考文章](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
[参考文章](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
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
        
其中store/store.jsx是保存数据的地方，一个应用只会有一个store    
redux提供一个创建store的方法createStore，并暴露出去，代码如下：
```javascript
import {createStore} from 'redux'
const initValue={
    'something':'xxx'
}
const store = createStore(reducer,initValue)
export default store
```
Action 是一个对象，type是必须的，表示Action的名称，是改变store中数据的唯一途径，代码如下:
```javascript
const action = {
    type: 'ADD_SOME',
    status: 'add somgthing'
};
```
当存在多个Action的时候，未来方便，我们写一个Action Creator,并暴露出去：
```javascript
export const addSomeAction=(status)=>({
    type:'ADD_SOME',
    status
}
);
```
这样就可以在js文件中调用addSomeAction的方法：
```javascript
store.dispatch({
    type: 'ADD_SOME',
    status: 'yyyy'
});
//or
store.dispatch(addSomeAction(status));
```
Action在操作store后会产生新的store数据，这个计算过程叫做Reducer     
```javascript
export default(state,action)=>{
    const {status}=action
        switch (action.type){
            case setNavStyle:
                 return {...state , state.SOME:status}
        default:
            return state
    }
}
```
Action会自动触发Reducer，从而达到修改store的数据的目的。
数据的改变，我们需要通知视图的变化，redux使用store.subscribe()，react-redux提供了connect连接UI组件和容器组件。
```javascript
export default connect(mapStateToProps,mapDispatchToProps, null, {
    pure: false
})('当前组件名称')
```
为了让容器拿到store的数据，react-redux提供了<Provider> 组件，一般在APP.jsx中始用，从而让store在整个应用中使用，代码如下：
```javascript
function App() {
    return (
        <Provider store={store}>
            <div>
                //... some codes ...
            </div>
        </Provider>
    );
}
export default App;
```
以上是react-redux实现数据状态管理的机理。
#### 6、配置代理
[官方文档](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually)
6.1、安装依赖
```
npm install http-proxy-middleware --save
```
6.2、新建/src/setupProxy.js<br>
代码如：/src/setupProxy.js<br>
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

