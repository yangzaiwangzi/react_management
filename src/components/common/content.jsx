import React  from 'react';
import {connect} from 'react-redux';

import './common.scss';
import RouterContent from './../../routers/routerContent.jsx';

function mapStateToProps(state){
    return {
        iconNavStyle: state.ICON_STYLE_NAV
    };
}
class content extends React.Component {
 
    render() { 
        const { iconNavStyle } = this.props;
        return (
            <div className="content" style={iconNavStyle ? {marginLeft:'40px'}:{marginLeft:'220px'}}>
                <RouterContent></RouterContent> 
            </div>
        )
    }
}
export default connect(mapStateToProps, null, null, {
    pure: false
  })(content);