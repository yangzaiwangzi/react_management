import React from 'react';
import UploadFile from './index.jsx'



class Test extends React.Component{
    constructor(){
        super();
        this.state = {
            fileList:[
                {
                    name:'xxx',
                    url:'aaaaaaaa'
                }
            ]
        }
    }
    onSuccessBack(val){ 
        let fileList = this.state.fileList;
        fileList.push({name:'',url:val.data[0]});
        this.setState({
            fileList
        })
    }
    onRemoveBack(val){
        let fileList = this.state.fileList;
        fileList.splice(val,1);
        this.setState({
            fileList
        })
    }
    render(){
        return (
            <div> 
                <UploadFile 
                    text={{
                        buttonText:"上传"
                    }}
                    uploadUrl="/api/meeting-mp/api/upload/uploadAttachment"
                    fileList={
                        this.state.fileList
                    }
                    onSuccess={this.onSuccessBack.bind(this)}
                    onRemove={this.onRemoveBack.bind(this)}
                    maxSize="5000"
                    accept="image/*"

                ></UploadFile>
            </div>
        )
    }

}

export default Test;