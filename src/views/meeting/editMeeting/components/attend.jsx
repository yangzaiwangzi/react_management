import React from 'react'; 
import './../index.scss'; 
import Zhuchi from './attend/zhuchi.jsx'; 
import Canyu from './attend/canyu.jsx'; 
import { Button,Message} from 'element-react'; 

import {setCompereAction} from './../../../../redux/action/index.jsx';
import {setAttendsAction} from './../../../../redux/action/index.jsx';
import {connect} from 'react-redux'; 
import { POST } from '../../../../api';

@connect(
    (state) => {
        return ({
            compere: state.COMPERE,
            attends: state.ATTENDS,
        });
    },
    {   
        setCompere:setCompereAction,
        setAttends:setAttendsAction
    }
) 

class Attend extends React.Component{
    constructor(props,state) {
        super(props,state);
        this.state = { 
        };
    } 
    async surebtn(){
        
        const setFirstInfo_sessionStorage = window.sessionStorage.getItem('setFirstInfo');
        let _firstInfo = null;
        if(setFirstInfo_sessionStorage){
            _firstInfo = JSON.parse(setFirstInfo_sessionStorage);
        }else{
            return Message.warning('会议信息填写未填写，请返回上一步，进行操作。');
        };

        const _compere = this.props.compere;
        const attendsVal = this.props.attends;
        if(!_compere||!attendsVal||attendsVal.length<=0){
            return Message.warning('请选择主持人或是参与人');
        };
        const _attends = attendsVal.map(item=>{
            return JSON.parse(item.val)
        });
        const _data = await POST('/api/meeting-mp/meeting/save',{..._firstInfo,compere:_compere,attends:_attends});
        Message.success(_data.message);
        console.log(_data);
        window.sessionStorage.removeItem('setFirstInfo');
        this.props.setCompere(null);
        this.props.setAttends(null);
        this.props.finishSecondStep();


    }       
    render() {  
        return(
            <div>
                <Zhuchi></Zhuchi>
                <br/>
                <Canyu></Canyu>
                <br/><br/>
                <div className="surebtnbox"> 
                    <Button>上一步</Button>
                    <Button type="primary" onClick={this.surebtn.bind(this)}>提交</Button>
                </div>
            </div>
        )
    }
};
 
export default Attend;