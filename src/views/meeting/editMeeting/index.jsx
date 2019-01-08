import React from 'react';
import { Tabs } from 'element-react';
import {GET} from './../../../api/index.js';
import './index.scss';
import Info from './components/info.jsx';
import Attend from './components/attend.jsx';

import {setDictLocalAction} from './../../../redux/action';
import {connect} from 'react-redux';

@connect(
    (state) => {
      return ({
        dicTlocal: state.DIC_TLOCAL
      });
    },
    {
        setDictLocal: setDictLocalAction
    }
)

class editMeeting extends React.Component{
    constructor(props){
        super(props);
         
        this.state = {
            currentName:"1"
        }
    }
    async componentDidMount(){
        if(this.props.dicTlocal.meetingRoomType.length<=0) { 
            const _data = await GET('/api/meeting-mp/dict/getDictLocal',{type:"all"});
            const getDictLocal = _data.data;
            this.props.setDictLocal(getDictLocal);
        }
    }
    tabChanged(tab){
        this.setState({currentName: tab});
    }
    finish(){
        this.props.history.push('/meeting')
    } 
    render(){
        return(
            <section>
                <p className="title">新增会议</p><br/> 
                <Tabs value={this.state.currentName} onTabClick={(val)=>this.tabChanged(val.props.name)}> 
                    <Tabs.Pane label="填写会议信息" name="1">
                        <Info finishFirstStep={(val)=>this.tabChanged(val)}/>
                    </Tabs.Pane>
                    <Tabs.Pane label="选择参会人" name="2">
                        <Attend finishSecondStep={this.finish.bind()}></Attend>
                    </Tabs.Pane>
                </Tabs> 
            </section>
        )
    }
};
export default editMeeting;