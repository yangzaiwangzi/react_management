import React from 'react';
import './index.scss';
import {GET} from './../../api/index.js';
import { Tag, Message} from 'element-react';

import {setDepartmentsAction} from '../../redux/action/index.jsx';
import {connect} from 'react-redux'; 

@connect(
    (state) => {
      return ({
        departments: state.DEPARTMENTS,
      });
    },
    {setDepartments:setDepartmentsAction}
)
class MultipleCascader extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            list:[],
            departMents:[],
            listShow:false,
            resultList:[]
        }
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
   
    async componentDidMount(){ 
        let departmentsData = null;
        if(this.props.departments){
            departmentsData = this.props.departments;
        }else{
            const _data = await GET('/api/meeting-mp/oa/findDepartMents',{id:"1565"});
            departmentsData = _data.data;
            this.props.setDepartments(departmentsData);
        };
        const _departMents = departmentsData.map((item)=>{
            return {
                show : false,
                id:item.id,
                orgName:item.orgName,
                parentId:item.parentId, 
            };
        });
        let list = [];
        const _list = _departMents.filter((item)=>{
            return item.parentId === 1;
        });
        list.push(_list);
        this.setState({
            departMents:_departMents,
            list
        });
        document.addEventListener('click', this.handleClickOutside, true);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }
    setList(id){
        return this.state.departMents.filter((item)=>{
            return item.parentId === id;
        });
    }
    handleClickOutside(e) {
        const _listShow = e.target.dataset.currentClickNode?true:false;
        if(!_listShow){
            this.setState({
                listShow:_listShow
            });
        };
        return;
    }

    handCliek(index,id,orgName,show){
        
        let list = this.state.list; 
 
        list[index].forEach((item)=>{
            item.show = false;
            if(item.id === id){
                item.show = true;
            }
        });
 
        const _list = this.setList(id);
        if(_list.length<=0){ 
            const resultList = this.state.resultList;
            const _hasId = resultList.some((item)=>{
                return item.id === id
            }); 
            if(_hasId){
                return Message.warning(`${orgName} 已选择，不可重复选择`);
            };
            this.getResultDepartMent(id,orgName);
            list.length = 1;
            return
        }else{ 
            list[index+1] = _list;
            list.length = index+2;
        };
        this.setState({
            list
        });
        
    }
    getResultDepartMent(id,orgName){
        this.setState({
            listShow:false
        });
        const { resultList } = this.state; 
        resultList.push({id,name:orgName}); 
        this.setResult(resultList);
    }
    removeResult(tag){
        const { resultList } = this.state; 
        resultList.splice(resultList.map(el => el.id).indexOf(tag.id), 1);  
        this.setResult(resultList);
    }
    setResult(resultList){
        this.setState({ resultList });
        this.props.onSelectChange(this.state.resultList)
    }
    showResultList(e){ 
        if(e.target.nodeName==='LI') return;
        this.setState({
            listShow:true
        });
    }
    render() {
        return (
             
            <div className="box" data-current-click-node="1" onClick={this.showResultList.bind(this)}>
                {
                    this.state.resultList.length>0 ?
                    <div className="result-list" data-current-click-node="1">   
                        {
                            this.state.resultList.map((item,index)=>{
                                return <Tag type="primary" 
                                    key={item.id}
                                    closable={true}
                                    closeTransition={false}
                                    onClose={this.removeResult.bind(this, item)}>{item.name}</Tag>
                                })
                        }
                        
                    </div>
                    :<span className="place">{this.props.placeholder||'请选择部门'}</span>
                }
                <i className={`el-icon-caret-bottom iconarrow ${this.state.listShow?'iconarrow_rotate':''}`} data-current-click-node="1"></i> 
                {
                    this.state.listShow ?
                    <div className="listbox" data-current-click-node="1">
                        {
                        this.state.list.map((ele,index)=>{
                            return <ul key={index} data-current-click-node="1">
                                {
                                    ele.map((item)=>{
                                        return  <li  key={item.id} 
                                                    onClick={this.handCliek.bind(this,index,item.id,item.orgName,item.show)}
                                                    data-current-click-node="1"
                                                    className={item.show?'active':''}
                                                >
                                                {item.orgName}
                                            </li>
                                    })
                                }
                                </ul>
                        })
                        }
                    </div> 
                    :''                       
                } 
            </div>
             
        )
    }
}
export default MultipleCascader;
