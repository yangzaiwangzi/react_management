import React from 'react';
import { Button,Select,Form,Input,DatePicker,Radio} from 'element-react';
import {NavLink} from 'react-router-dom';
import './../index.scss';
import Timer from './../../../../tools/index.js'
import {GET} from './../../../../api/index.js';
import UploadFile from './../../../../components/uploadFile/index.jsx';

import {connect} from 'react-redux'; 

@connect(
    (state) => {
      return ({
        dicTlocal: state.DIC_TLOCAL,
        findMeetingUpdate: state.FIND_MEETING_UPDATE,
      });
    }
)

class Info extends React.Component{
    constructor(props,state) {
        super(props,state);
        this.state = {
            form: {
                id:'',
                meetingStatus:1,
                meetingName: '',
                meetingType: '',
                startTime: null,
                endTime: null,
                meetingRoomType: '',
                meetingSignIn:'',
                meetingSign: { 
                    timeLimit:'',
                    qualifiedStandard:0,
                },
                isVideoRecord: 0,
                description: '',
                informations:[],
            },
            fileList:[], 
            rules: {
                meetingName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                meetingType: [
                    { type: 'number',required: true, message: '请选择会议种类', trigger: 'change' }
                ],
                meetingRoomType: [
                    { type: 'number',required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                meetingSignIn: [
                    { required: true, message: '请选择签到设置', trigger: 'change' }
                ],
                startTime: [
                    { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                ], 
                endTime: [
                    { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
                ], 
                isVideoRecord: [
                    { type: 'number', required: true, message: '请选择是否录像', trigger: 'change' }
                ],
                meetingSign:{ 
                    timeLimit: [
                        { required: true, message: '请输入时间限制'}
                    ],
                    qualifiedStandard: [
                        { type: 'number', required: true, message: '请选择合格要求', trigger: 'change' }
                    ],
                }
            },
        };
    }
    async componentWillMount(){
        const id = window.location.href.split('?id=')[1];
        if(id){ 
            const _data = await GET('/api/meeting-mp/meeting/findMeetingUpdate',{id}); 
            const data = _data.data;
            this.mountFun({...data,meetingSignIn:'1',isVideoRecord:Number(data.isVideoRecord)});
            return;
        };
        
        const setFirstInfo_sessionStorage = window.sessionStorage.getItem('setFirstInfo');
        if(setFirstInfo_sessionStorage){
            const _setFirstInfo = JSON.parse(setFirstInfo_sessionStorage); 
            this.mountFun(_setFirstInfo);
        };
    }
    mountFun(_setFirstInfo){
        if(_setFirstInfo.startTime){
            _setFirstInfo.startTime = new Timer(_setFirstInfo.startTime).reverseFormat();
        }; 
        if(_setFirstInfo.endTime){
            _setFirstInfo.endTime = new Timer(_setFirstInfo.endTime).reverseFormat();
        };
        const fileList = _setFirstInfo.informations.map(item => {
            return {
                name:'',
                url:item
            }
        });
        this.setState({
            form: Object.assign({}, _setFirstInfo),
            fileList:fileList
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        let startTime = null;
        if(this.state.form.startTime){
            startTime = new Timer(this.state.form.startTime).format('yyyy-mm-dd hh:mm:ss');
        }else{
            startTime = '';
        };
        let endTime = null;
        if(this.state.form.endTime){
            endTime = new Timer(this.state.form.endTime).format('yyyy-mm-dd hh:mm:ss');
        }else{
            endTime = '';
        };
        this.refs.form.validate((valid) => {
            if (valid) {
                this.handleSubmitFun({...this.state.form,startTime,endTime})
            };
        });
    }

    async handleSubmitFun(params){

        window.sessionStorage.setItem('setFirstInfo',JSON.stringify(params));
        this.props.finishFirstStep("2");
    }
      
    handleReset(e) {
        e.preventDefault();
        
        this.refs.form.resetFields();
    }
      
    onChange(key,box,value) {
        const _form = this.state.form;
        if(box){
            _form[box][key] = value;
        }else{
            _form[key] = value;
        }
        this.setState({
            form: _form
        });
    }
    //上传文件 模块
    onSuccessBack(val){ 
        let fileList = this.state.fileList;
        let informations = this.state.form.informations;
        fileList.push({name:'',url:val.data[0]});
        informations.push(val.data[0]);
        this.setState({
            fileList,
            form: Object.assign({}, this.state.form, { informations })
        })
    }
    onRemoveBack(val){
        let fileList = this.state.fileList;
        let informations = this.state.form.informations;
        fileList.splice(val,1);
        informations.splice(val,1);
        this.setState({
            fileList,
            form: Object.assign({}, this.state.form, { informations })
        })
    }  
           
    render() {
        const fileListDate = this.state.fileList;
        const {meetingName,meetingType,startTime,endTime,meetingRoomType,meetingSign,meetingSignIn,
                isVideoRecord} = this.state.form;


        return (
            <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="140" >
                <Form.Item label="会议名称" prop="meetingName">
                    <Input className="inputBox" value={meetingName} onChange={this.onChange.bind(this, 'meetingName','')}></Input>
                </Form.Item>
                <Form.Item label="会议种类" prop="meetingType">
                    <Select clearable className="inputBox" value={meetingType}  onChange={this.onChange.bind(this, 'meetingType','')}>
                        {
                            this.props.dicTlocal.meetingType.map(item => {
                                return <Select.Option key={item.value} label={item.desc} value={item.value} />
                            })
                        } 
                    </Select>
                </Form.Item>
                <Form.Item label="开始时间" required={true} prop="startTime">
                    <DatePicker
                        className="inputBox"
                        format="yyyy-MM-dd HH:mm:ss"
                        value={startTime}
                        isShowTime={true}
                        onChange={this.onChange.bind(this, 'startTime','')}
                        disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
                    />
                </Form.Item>
                <Form.Item label="结束时间" required={true} prop="endTime">
                    <DatePicker
                        className="inputBox"
                        format="yyyy-MM-dd HH:mm:ss"
                        value={endTime}
                        isShowTime={true}
                        onChange={this.onChange.bind(this, 'endTime','')}
                        disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
                    />
                </Form.Item> 
                <Form.Item label="会议室类型" prop="meetingRoomType">
                    <Select clearable className="inputBox" value={meetingRoomType} onChange={this.onChange.bind(this, 'meetingRoomType','')}>
                        {
                            this.props.dicTlocal.meetingRoomType.map(item => {
                                return <Select.Option key={item.value} label={item.desc} value={item.value} />
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="签到设置" prop="meetingSignIn">
                    <Select clearable className="inputBox" value={meetingSignIn} onChange={this.onChange.bind(this, 'meetingSignIn','')}>
                        <Select.Option label="完成签到答题" value="1"></Select.Option>
                        <Select.Option label="完成签到答题2" value="2"></Select.Option>
                    </Select>
                </Form.Item>
                    {
                        meetingSignIn==='1' ?
                        <section className="singinbox">
                            <Form.Item label="时间限制" prop="meetingSign.timeLimit">
                                <Input className="inputBox" type="number" value={meetingSign.timeLimit} onChange={this.onChange.bind(this, 'timeLimit','meetingSign')}></Input>
                            </Form.Item>
                            <Form.Item label="合格要求" prop="meetingSign.qualifiedStandard">
                                <Radio.Group value={meetingSign.qualifiedStandard} onChange={this.onChange.bind(this, 'qualifiedStandard','meetingSign')}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </Radio.Group>
                            </Form.Item> 
                        </section>
                        :''
                    }
                 <Form.Item label="是否录像" prop="isVideoRecord">
                    <Radio.Group value={isVideoRecord} onChange={this.onChange.bind(this, 'isVideoRecord','')}>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述">
                    <Input className="inputBox" type="textarea" rows={5} value={this.state.form.description} onChange={this.onChange.bind(this, 'description','')}></Input>
                </Form.Item>
                <Form.Item>
                    <UploadFile 
                        text={{
                            buttonText:"上传"
                        }}
                        uploadUrl="/api/meeting-mp/api/upload/uploadAttachment"
                        fileList={fileListDate}
                        onSuccess={this.onSuccessBack.bind(this)}
                        onRemove={this.onRemoveBack.bind(this)}
                        maxSize="5000"
                        accept="image/*"

                    ></UploadFile>
                </Form.Item>
                <br/>
                <Form.Item>
                    <NavLink to="/Meeting">
                        <Button type="primary" >返回</Button>
                    </NavLink> 
                    &nbsp;&nbsp;
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>下一步</Button>
                </Form.Item>
            </Form>
        )
    }
};
 
export default Info;