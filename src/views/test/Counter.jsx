import React from 'react'
import {increment} from '../../redux/action'
import {connect} from 'react-redux';

function Counter({ Increment, value}){
    return (
        <div>
            <button onClick={Increment}>+</button>
            <span>vvvv :  {value}</span>
        </div>
    )
}
function mapState(state,ownProps){
    return{
        value:state['F']
    }
}
function mapDispatch(dispatch,ownProps){
    return {
        Increment:()=>{
            dispatch(increment())
        }

    }
}

export default connect(mapState,mapDispatch)(Counter)