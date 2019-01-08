import React from 'react';
import './../../index.scss';
import { POST,GET} from '../../../../../api/index.js';
import { Input,Button,Table, Message} from 'element-react';
import MultipleCascader from '../../../../../components/multipleCascader/index';

import {setCompereAction} from './../../../../../redux/action/index.jsx';
import {connect} from 'react-redux'; 

@connect(
    (state) => {
      return ({
        compere: state.COMPERE,
      });
    },
    {setCompere:setCompereAction}
)

class Zhuchi extends React.Component{
    constructor(){
        super()
        this.state = {
            param:{
                startTime: "" ,
                endTime: "",
                key: "",
                meetingId: "",
                orgIds: [],
            },
            time:{
                startTime:'',
                endTime:''
            },
            data: [],
            compere:null
        }
    }
    async componentDidMount(){
        const id = window.location.href.split('?id=')[1];
        if(id){ 
            const _data = await GET('/api/meeting-mp/meeting/findMeetingUpdate',{id}); 
            let data = [];
            data[0] = _data.data.compere;
            
            this.props.setCompere(data[0]);
            this.setState({
                data
            });
        };
        const setFirstInfo = window.sessionStorage.getItem('setFirstInfo');
        if(setFirstInfo){
            const {startTime,endTime} = JSON.parse(setFirstInfo);
            this.setState({
                param:Object.assign({}, this.state.param, {startTime,endTime}),
                time:{startTime,endTime}
            });
        }
    }

    onSelectChange(val){ 
        const orgIds = val.map((item)=>{
            return item.id
        });
        this.setState({
            param:Object.assign({}, this.state.param, { orgIds })
        });
    }
      
    onChange(key, value) {  
        this.setState({
            param: Object.assign({}, this.state.param, { [key]: value })
        });
    }
    onCurrentChange(item){
        
        this.props.setCompere(Object.assign({}, item, this.state.time,{isCompere:true}));
        this.setState({
            compere: Object.assign({}, item, this.state.time,{isCompere:true})
        });
    }
    async sureBtn(){
        if(this.state.param.orgIds.length<=0){
            return Message.warning('至少选择一个部门');
        }
        const _data = await POST('/api/meeting-mp/oa/findPerson',this.state.param);
        this.props.setCompere(null);
        this.setState({
            data: _data.data,
            compere:null
        });
    }
    render(){
        const columns = [
            {
              label: "姓名",
              prop: "name"
            },
            {
              label: "手机号",
              prop: "mobile",
              width: 160
            },
            {
              label: "时间是否冲突",
              width: 160,
              render:(data)=>{
                  return (
                      <span>{  data.isTimeRepeat?"是":"否" }</span>
                  )
              }
            }
        ]
        return (
            <div className="attends">
                <p className="title">请选择主持人</p>
                <div>
                    <MultipleCascader placeholder="请选择部门" onSelectChange={this.onSelectChange.bind(this)}></MultipleCascader>
                    <Input placeholder="请输入内容" value={this.state.param.key} onChange={this.onChange.bind(this,'key')}/>
                    <Button type="primary" icon="search" onClick={()=>{this.sureBtn()}}>搜索</Button> 
                </div>
                <br/>
                <Table
                    style={{width: '700px'}}
                    columns={columns}
                    data={this.state.data}
                    border={true}
                    height={200}
                    highlightCurrentRow={true}
                    onCurrentChange={item=>{this.onCurrentChange(item)}}
                />
            </div>
        )
    }
}

export default Zhuchi; 