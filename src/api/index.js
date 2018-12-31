/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import store from '../redux/store/store' 
import {setLoadingShowAction} from '../redux/action' 
// import QS from 'qs';


// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 请求拦截器
axios.interceptors.request.use(    
    config => {
        store.dispatch(setLoadingShowAction(true))
        return config;    
    },    
    error => {        
        return Promise.error(error);    
    }
);

// 响应拦截器
axios.interceptors.response.use(    
    response => {
        if (response.data.code === '11') {//未登录
            window.location.href= "http://portal-test.zmlearn.com/login?redirectUrl=" + encodeURIComponent(window.location.href);
        }; 
        store.dispatch(setLoadingShowAction(false)) 
        return Promise.resolve(response); 
    },
    error => {        
        if (error.response.status) {             
            return Promise.reject(error.response);        
        }       
    }
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function GET(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        })        
        .then(res => {
            if(res.data.code!=='0'){
                console.log(res.data.message||"接口请求出错...");
            }else{
                resolve(res.data);  
            };    
        })        
        .catch(err => {              
            //Toast('响应异常');       
            reject(err.data)        
        })    
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function POST(url, params) {    
    return new Promise((resolve, reject) => {         
        axios.post(url, params)        
        .then(res => {
            if(res.data.code!=='0'){
                console.log(res.data.message||"接口请求出错...");
            }else{
                resolve(res.data);  
            };   
        })        
        .catch(err => {            
            //Toast('响应异常');           
            reject(err.data)        
        })    
    });
}