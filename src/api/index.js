/**axios再封装
 * cunyang
 * 2019-01-05
 */
import axios from 'axios';
import store from '../redux/store/store' 
import { setLoadingShowAction } from '../redux/action'; 
import { Message } from 'element-react'; 


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
            Message.error('服务访问出错，稍后重试');            
            return Promise.reject(error.response);        
        }       
    }
);
/** 
 * GET方法，对应get请求 
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
                Message.error(res.data.message||"response error ...");  
            }else{
                resolve(res.data);  
            };    
        })        
        .catch(err => {  
            console.error('服务访问出错，稍后重试');   
            // reject(err.data)        
        })    
    });
}
/** 
 * POST方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function POST(url, params) {    
    return new Promise((resolve, reject) => {         
        axios.post(url, params)        
        .then(res => {
            if(res.data.code!=='0'){
                Message.error(res.data.message||"response error ...");
            }else{
                resolve(res.data);  
            };   
        })        
        .catch(err => {          
            console.error('服务访问出错，稍后重试');           
            // reject(err.data)        
        })    
    });
}