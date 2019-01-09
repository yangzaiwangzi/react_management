/*
*cunynag / 2019-01-09
*
*文件上传组件
*依赖element-react中Button、Icon、Message
*依赖接口交互axios(POST)
*支持多选，多选接口部分需调节！！！
*params
*   text:文案对象（buttonText）
*   uploadUrl：接口地址
*   fileList：初始文件列表
*   onSuccess：成功回调地址
*   maxSize：文件最大值（单位：KB）
*   accept：控制上传文件的类型，可参考input/accept的内容
*/


import React from 'react';
import { Button, Icon,Message} from 'element-react';
import {POST} from './../../api';
import './index.scss';



class UploadFile extends React.Component{
     
    async onChangeBtn(e){ 
        const _files = e.target.files;
        Array.from(_files).forEach(item=>{
            if(item.size/1024>this.props.maxSize){
                Message.warning(`上传文件不可大于${this.props.maxSize}KB`);
                return;
            }
        });
        let formData = new FormData();
        formData.append("file",  this.props.multiple?_files:_files[0]);
        const _data = await POST(this.props.uploadUrl,formData);
        this.props.onSuccess(_data);
    }
    render(){
        const {text,multiple,fileList,accept} = this.props;
        return (
            <div> 
                <input 
                    multiple={multiple||false} 
                    type="file" 
                    accept={accept}
                    id="special_uploadfile"  
                    className="special_uploadfile"
                    onChange={this.onChangeBtn.bind(this)}>
                </input>
                <Button type="primary" icon="upload">
                    {text.buttonText||"上传"}
                    <label htmlFor="special_uploadfile" className="special_uploadfile_btn"></label>
                </Button>
                <div className="listfile">
                    {
                        fileList.map((item,index)=>{
                            return <p key={index}><Icon name="document" /><span>{item.name}</span><Icon name="check" /><span onClick={this.props.onRemove.bind(this,index)}><Icon name="close"/></span></p>
                        })
                    }
                </div>
            </div>
        )
    }

}

export default UploadFile;