import {createStore} from 'redux';
import reducer from '../reducer'; 
const initValue={
    'ICON_STYLE_NAV':false,
    'LOADING_SHOW':false,
    'COMPERE':null,
    'ATTENDS':null,
    'DEPARTMENTS':null,
    'FIND_MEETING_UPDATE':null,
    "DIC_TLOCAL":{
        meetingType:[],
        meetingRoomType:[],
        meetingStatus:[]
    }
};
const store = createStore(reducer,initValue);
export default store;