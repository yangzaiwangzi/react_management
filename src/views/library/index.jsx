import React from 'react';
import {GET,POST} from './../../api/index.js';
import { Button,Table,Select,Form,Input,DateRangePicker} from 'element-react';
import "./index.scss"

class Library extends React.Component {

    constructor(props){
        super(props);
        this.state={
            listTable:[],
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
            getDictLocal:{
                meetingType:[],
                meetingRoomType:[],
                meetingStatus:[]
            },
            value: ''
        }
    }
    
    async componentDidMount(){ 
        this.getListData();
        const _data2 = await GET('/api/meeting-mp/dict/getDictLocal',{type:"all"});
        const getDictLocal = _data2.data;
        this.setState({
            getDictLocal:getDictLocal 
        });
    }
    onChangeValue(key, value) { 
        let params = this.state.params;
        params[key] = value;
        this.setState({
            params:params
        });
    }
    async getListData(){
        const _data = await POST('/api/meeting-mp/meeting/page',this.state.params);
        const listTable = _data.data.items; 
        this.setState({
            listTable:listTable||[]
        });  
    }
    async searchBtn(){
        this.getListData()
    }
    render() {
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
              width: 120
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
              render: ()=>{
                return (
                    <span>
                        <Button type="text" size="small">查看</Button>
                        <Button type="text" size="small">编辑</Button>
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
                                this.state.getDictLocal.meetingType.map(item => {
                                    return <Select.Option key={item.value} label={item.desc} value={item.value} />
                                })
                            } 
                        </Select>
                    </Form.Item>
                    <Form.Item label="会议室类型">
                        <Select clearable value={this.state.params.meetingRoomType} placeholder="会议室类型" onChange={this.onChangeValue.bind(this, 'meetingRoomType')}>
                            {
                                this.state.getDictLocal.meetingRoomType.map(item => {
                                    return <Select.Option key={item.value} label={item.desc} value={item.value} />
                                })
                            } 
                        </Select>
                    </Form.Item>
                    <Form.Item label="状态">
                        <Select clearable value={this.state.params.meetingStatus} placeholder="状态" onChange={this.onChangeValue.bind(this, 'meetingStatus')}>
                            {
                                this.state.getDictLocal.meetingStatus.map(item => {
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
                        <Button type="primary" size="small" icon="edit">新增会议</Button>
                    </Form.Item>
                </Form>
                <br/>
                <Table
                    style={{width: '100%'}}
                    columns={columns}
                    data={this.state.listTable}
                    border={true}
                />
            </div>
        ) 
    }
}
export default Library;
