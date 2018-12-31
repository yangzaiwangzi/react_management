import React from 'react';
import './common.scss';
import {connect} from 'react-redux';
import { Icon} from 'element-react';
function mapStateToProps(state){
    return {
        loadingShow: state.LOADING_SHOW
    };
}
class NavHead extends React.Component {
    render() {
        const { loadingShow } = this.props;
        return (
            <div className="headbox">
                <span>培训系统</span> 
                {
                    loadingShow ? <span>&nbsp;&nbsp;&nbsp;<Icon name="loading" /></span>:''
                }
                <span>张三</span>
            </div>
        )
    }
} 
export default connect(mapStateToProps, null, null, {
    pure: false
  })(NavHead);