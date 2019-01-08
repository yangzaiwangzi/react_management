import { 
    setNavStyle,
    setLoadingShow,
    setDictLocal,
    setCompere,
    setAttends,
    setDepartments,
    setFindMeetingUpDate
} from '../action';
export default(state,action)=>{
    const {status,data}=action
    switch (action.type){
        case setNavStyle:
            return {...state,ICON_STYLE_NAV:!state.ICON_STYLE_NAV}
        case setLoadingShow:
            return {...state,LOADING_SHOW:status}
        case setDictLocal:
            return {...state,DIC_TLOCAL:data}
        case setCompere:
            return {...state,COMPERE:data}
        case setAttends:
            return {...state,ATTENDS:data}
        case setDepartments:
            return {...state,DEPARTMENTS:data}
        case setFindMeetingUpDate:
            return {...state,FIND_MEETING_UPDATE:data}
        default:
            return state
    }
};
