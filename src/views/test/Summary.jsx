import React from 'react';
import {connect} from 'react-redux';
function Summary({value}){
    return (
        <div>Total Count: {value}</div>
    );
}
function mapState(state){
    return {value: state['F']};
}
export default connect(mapState)(Summary)