import React from 'react';
import {GET,POST} from './../../api/index.js';
import { Button,Table,Select,Form,Input,DateRangePicker,Pagination} from 'element-react';
import {NavLink,Link} from 'react-router-dom';
import "./index.scss"

import {setDictLocalAction} from './../../redux/action'
import {connect} from 'react-redux';

@connect(
    (state) => {
      return ({
        dicTlocal: state.DIC_TLOCAL,
      });
    },
    {setDictLocal: setDictLocalAction}
)


class Meeting extends React.Component {

    constructor(props){
        super(props);
        this.state={
            listTable:[],
            total:0,
            time:null,
            params:{
                meetingType:"",
                meetingRoomType:"",
                meetingStatus:"",
                isVideoRecord:"",
                meetingName:"",
                compere:"",
                attend:"",
                startTime:"",
                endTime:"",
                pageNo:1
            },
        }
    }
    
    async componentDidMount(){ 
        this.getListData();
        const _data2 = await GET('/api/meeting-mp/dict/getDictLocal',{type:"all"});
        const getDictLocal = _data2.data;
        this.props.setDictLocal(getDictLocal);
    }
    async getListData(){
        const _data = await POST('/api/meeting-mp/meeting/page',this.state.params);
        const listTable = _data.data.items; 
        const total = _data.data.total;
        this.setState({
            listTable:listTable||[],
            total
        });  
    }
    onChangeValue(key, value) { 
        let params = this.state.params;
        params[key] = value;
        this.setState({
            params:params
        });
    }
    async searchBtn(){
        this.getListData()
    }
    onCurrentChange(val){
        let params = this.state.params;
        params.pageNo = val;
        this.setState({
            params:params
        });
        this.getListData();
    }
    render() {
        const {meetingType,meetingRoomType,meetingStatus} = this.props.dicTlocal;
        const columns =  [
            {
              label: "会议名称",
              prop: "meetingName",
              align:"center",
              width: 150,
            },
            {
              label: "会议种类",
              prop: "meetingTypeName",
              align:"center",
              width: 160
            },
            {
              label: "会议室类型",
              prop: "meetingRoomTypeName",
              align:"center",
              width: 160
            },
            {
              label: "主持人",
              prop: "compereName",
              align:"center",
              width: 400
            },
            {
              label: "参会人数",
              prop: "attendantNum",
              align:"center",
              width: 120
            },
            {
              label: "开始时间",
              prop: "startTime",
              align:"center",
              width: 180
            },
            {
              label: "结束时间",
              prop: "endTime",
              align:"center",
              width: 180
            },
            {
              label: "状态",
              prop: "meetingStatusName",
              align:"center",
              width: 120
            },
            {
              label: "是否录像",
              prop: "isVideoRecord",
              align:"center",
              width: 120,
              render: (data)=>{
                return (
                    <span>
                        {  data.isVideoRecord?"是":"否" }
                    </span>
                ) 
              }
            },
            {
              label: "创建人",
              prop: "operateName",
              align:"center",
              width: 120
            },
            {
              label: "创建时间",
              prop: "createdAt",
              align:"center",
              width: 180
            },
            {
              label: "操作",
              prop: "zip",
              fixed: 'right',
              width: 140,
              render: (data)=>{
                return (
                    <span>
                        <Button type="text" size="small">查看</Button>&nbsp;&nbsp;
                        <Link to={`/editMeeting?id=${data.id}`}>
                            <Button type="text" size="small">编辑</Button>
                        </Link> 
                    </span>
                ) 
              }
            }]
        return(
            <div>
                <Form inline={true} labelWidth="100">
                    <Form.Item label="会议种类">
                        <Select clearable value={this.state.params.meetingType} placeholder="会议种类"  onChange={this.onChangeValue.bind(this, 'meetingType')} >
                            {
                                meetingType.map(item => {
                                    return <Select.Option key={item.value} label={item.desc} value={item.value} />
                                })
                            } 
                        </Select>
                    </Form.Item>
                    <Form.Item label="会议室类型">
                        <Select clearable value={this.state.params.meetingRoomType} placeholder="会议室类型" onChange={this.onChangeValue.bind(this, 'meetingRoomType')}>
                            {
                                meetingRoomType.map(item => {
                                    return <Select.Option key={item.value} label={item.desc} value={item.value} />
                                })
                            } 
                        </Select>
                    </Form.Item>
                    <Form.Item label="状态">
                        <Select clearable value={this.state.params.meetingStatus} placeholder="状态" onChange={this.onChangeValue.bind(this, 'meetingStatus')}>
                            {
                                meetingStatus.map(item => {
                                    return <Select.Option key={item.value} label={item.desc} value={item.value} />
                                })
                            } 
                        </Select>
                    </Form.Item>
                    <Form.Item label="是否录像">
                        <Select clearable value={this.state.params.isVideoRecord} placeholder="是否录像" onChange={this.onChangeValue.bind(this, 'isVideoRecord')}>
                            <Select.Option label="区域一" value="shanghai"></Select.Option>
                            <Select.Option label="区域二" value="beijing"></Select.Option>
                        </Select>
                    </Form.Item>
                    <br/>
                    <Form.Item label="会议名称">
                        <Input value={this.state.params.meetingName} placeholder="会议名称" onChange={this.onChangeValue.bind(this, 'meetingName')}></Input>
                    </Form.Item>
                    <Form.Item label="主持人">
                        <Input value={this.state.params.compere} placeholder="主持人" onChange={this.onChangeValue.bind(this, 'compere')}></Input>
                    </Form.Item>
                    <Form.Item label="参会人">
                        <Input value={this.state.params.attend} placeholder="参会人" onChange={this.onChangeValue.bind(this, 'attend')}></Input>
                    </Form.Item>
                    <Form.Item label="会议日期">
                        <DateRangePicker
                            clearable 
                            value={this.state.time}
                            placeholder="选择日期范围"
                            onChange={date=>{
                                console.debug('DateRangePicker1 changed: ', date)
                                this.setState({time: date})
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="small" icon="search" onClick={this.searchBtn.bind(this)}>搜索</Button>
                        &nbsp;&nbsp;
                        <NavLink to="/editMeeting">
                            <Button type="primary" size="small" icon="edit">新增会议</Button>
                        </NavLink> 
                    </Form.Item>
                </Form>
                <br/>
                <Table
                    style={{width: '100%'}}
                    columns={columns}
                    data={this.state.listTable}
                    border={true}
                />
                <div className="paginationBox">
                    <Pagination layout="total, prev, pager, next" total={this.state.total} onCurrentChange={this.onCurrentChange.bind(this)}/> 
                </div>
            </div>
        ) 
    }
}
export default Meeting;
