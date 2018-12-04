import { setNavStyle } from '../action'
export default(state,action)=>{
    switch (action.type){
        case setNavStyle:
            return {...state,ICON_STYLE_NAV:!state.ICON_STYLE_NAV}
        default:
            return state
    }
}