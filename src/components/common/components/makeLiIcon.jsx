import React from 'react'; 
import {NavLink} from 'react-router-dom';

class MakeLi extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list:this.props.linkList
        }
        this.showItemNav = this.showItemNav.bind(this);
    } 
    showItemNav(index){
        let _list =  this.state.list; 
        if(_list[index].childrenShow){
            _list[index].childrenShow =  _list[index].childrenShow==='hide'?'show':'hide'; 
            this.setState({
                list:_list
            }); 
        };
    }
    
    render() {
        const listItems = this.props.linkList.map((item,index) => 
            <li key={item.name}> 
                { 
                    item.toLink ? 
                    <NavLink exact activeClassName="active" to={item.toLink}><i className="iconfont icon-star"></i></NavLink> : 
                    <div>
                        <p onClick={()=>{this.showItemNav(index)}}>
                            <i className="iconfont icon-dashujukeshihuaico-"></i>
                        </p>
                        <MakeLi linkList={item.children} childrenShow={item.childrenShow}></MakeLi>
                    </div>
                }                    
            </li> 
        );
        return (
            <ul className={this.props.childrenShow==='hide'?"hide":"show"}>{listItems}</ul>
        );
    }
};

export default MakeLi;