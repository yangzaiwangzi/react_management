import { setNavStyle,setLoadingShow } from '../action'
export default(state,action)=>{
    const {status}=action
    switch (action.type){
        case setNavStyle:
            return {...state,ICON_STYLE_NAV:!state.ICON_STYLE_NAV}
        case setLoadingShow:
            return {...state,LOADING_SHOW:status}
        default:
            return state
    }
}
