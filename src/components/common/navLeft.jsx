import React from 'react';
import './common.scss';
import {setNavStyleAction} from '../../redux/action'
import {connect} from 'react-redux';


import MakeLi from './components/makeLi.jsx';
import MakeLiIcon from './components/makeLiIcon.jsx';
import linkList from './../../routers/routerLink.js';


function mapStateToProps(state,ownProps){
    return{
        iconNavStyle: state.ICON_STYLE_NAV
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return {
        setNavStyle:()=>{
            dispatch(setNavStyleAction())
        }

    }
}



class NavLeft extends React.Component {
    linkList = linkList;
    render() {
        const { iconNavStyle,setNavStyle} = this.props;
        return (
            <div className={iconNavStyle?"navlefticon":"navleft"}>
                <div className={`iconkey ${iconNavStyle?"right":""}`} onClick={()=>{setNavStyle()}}>
                    <i className="iconfont icon-iconset0412"></i>
                </div>
                {
                    iconNavStyle ?
                    <MakeLiIcon linkList = { this.linkList }></MakeLiIcon> :
                    <MakeLi linkList = { this.linkList }></MakeLi> 
                }
            </div>
        )
    }
};
export default connect(mapStateToProps,mapDispatchToProps, null, {
    pure: false
  })(NavLeft)