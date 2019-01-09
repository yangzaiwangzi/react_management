import React from 'react';
import './../../index.scss';
import { POST,GET} from '../../../../../api/index.js';
import { Input,Button,Checkbox, Message} from 'element-react';
import MultipleCascader from '../../../../../components/multipleCascader/index'

import {setAttendsAction} from './../../../../../redux/action/index.jsx';
import {connect} from 'react-redux'; 

@connect(
    (state) => {
      return ({
        attends: state.ATTENDS,
      });
    },
    {setAttends:setAttendsAction}
)

class Canyu extends React.Component{
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
            attendList:{
                list_left:[],
                list_left_value:[],
                list_right:[],
                list_right_value:[]
            }
        }
    }
    async componentDidMount(){
        const id = window.location.href.split('?id=')[1];
        if(id){ 
            const _data = await GET('/api/meeting-mp/meeting/findMeetingUpdate',{id}); 
            const data = _data.data.attends; 
            const _list = data.map((item)=>{
                return {
                    userId:item.userId,
                    name:item.name,
                    val:JSON.stringify(item)
                }
            })

            this.props.setAttends(_list);
            this.setState({
                attendList:Object.assign({}, this.state.attendList, {list_left:_list,list_right:_list}), 
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
    async sureBtn(){
        if(this.state.param.orgIds.length<=0){
            return Message.warning('至少选择一个部门');
        };
        const {startTime,endTime} = this.state.time;
        const _data = await POST('/api/meeting-mp/oa/findPerson',this.state.param);
        const _list = _data.data.map((item)=>{
            item.startTime = startTime;
            item.endTime = endTime;
            item.isCompere = false;
            return {
                userId:item.userId,
                name:item.name,
                val:JSON.stringify(item)
            }
        })
        this.setState({
            attendList:Object.assign({}, this.state.attendList, {list_left:_list})
        });
    }
    onChangeLeft(val){
        this.setState({
            attendList:Object.assign({}, this.state.attendList, {list_left_value:val})
        });
    }
    onChangeRight(val){
        this.setState({
            attendList:Object.assign({}, this.state.attendList, {list_right_value:val})
        });
    }
    moveFromLeft(){// left => right
        const list_left_value = this.state.attendList.list_left_value;
        const list_right = this.state.attendList.list_right;
        const _list = list_left_value.map((item)=>{
            const _item = JSON.parse(item)
            return {
                userId:_item.userId,
                name:_item.name,
                val:item
            }
        });
        const result_right = this.removeArrayRepeat([...list_right,..._list]);
        this.props.setAttends(result_right);
        this.setState({
            attendList:Object.assign({}, this.state.attendList, {list_right:result_right})
        });
    }
    moveFromRight(){// left <= right
        const list_right = this.state.attendList.list_right;
        const list_right_value = this.state.attendList.list_right_value;
        const list_left = this.state.attendList.list_left;
        
        const _list = list_right_value.map((item)=>{
            const _item = JSON.parse(item)
            return {
                userId:_item.userId,
                name:_item.name,
                val:item
            }
        });
        const result_left = this.removeArrayRepeat([...list_left,..._list]); 

        const result_right = this.removeArrayChecked(list_right,_list); 

        this.props.setAttends(result_right);
        this.setState({
            attendList:Object.assign({}, this.state.attendList, {
                list_left:result_left,
                list_right:result_right,
                list_right_value:[],
            })
        });
    }
    removeArrayRepeat(array){
        let hash = {};
        let _result = [];
        array.forEach((item) => {
            if(!hash[item.userId]){
                hash[item.userId] = true;
                _result.push(item);
            }
        });
        return _result;
    }
    removeArrayChecked(array,checkedArray){
        let hash = {};
        checkedArray.forEach( item =>{
            hash[item.userId] = true
        });
        let _result = [];
        array.forEach((item) => {
            if(!hash[item.userId]){
                _result.push(item);
            }
        });
        return _result;
    }
    render(){ 
        return (
            <div className="attends">
                <p className="title">请选择参与人</p>
                <div>
                    <MultipleCascader placeholder="请选择部门" onSelectChange={this.onSelectChange.bind(this)}></MultipleCascader>
                    <Input placeholder="请输入内容" value={this.state.param.key} onChange={this.onChange.bind(this,'key')}/>
                    <Button type="primary" icon="search" onClick={()=>{this.sureBtn()}}>搜索</Button> 
                </div>
                <br/> 
                <div> 
                    <Checkbox.Group value={this.state.attendList.list_left_value} onChange={this.onChangeLeft.bind(this)}>
                        {
                            this.state.attendList.list_left.map((item)=>{
                                return <Checkbox key={item.userId} label={item.val}>{item.name}</Checkbox>
                            })
                        }
                    </Checkbox.Group>
                    <div className="btnbox">
                        <Button type="primary" icon="arrow-right" size="small" onClick={this.moveFromLeft.bind(this)}>选择</Button>
                        <br/><br/>
                        <Button type="primary" icon="arrow-left" size="small"  onClick={this.moveFromRight.bind(this)}>移除</Button>
                    </div>
                    <Checkbox.Group value={this.state.attendList.list_right_value} onChange={this.onChangeRight.bind(this)}>
                        {
                            this.state.attendList.list_right.map((item)=>{
                                return <Checkbox key={item.userId} label={item.val}>{item.name}</Checkbox>
                            })
                        }
                    </Checkbox.Group>
                </div>
            </div>
        )
    }
}

export default Canyu; 