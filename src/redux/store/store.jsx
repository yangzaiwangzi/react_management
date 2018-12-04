import {createStore} from 'redux'
import reducer from '../reducer' 
const initValue={
    'ICON_STYLE_NAV':false
}
const store=createStore(reducer,initValue)
export default store