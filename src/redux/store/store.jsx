import {createStore} from 'redux'
import reducer from '../reducer' 
const initValue={
    'ICON_STYLE_NAV':false,
    'LOADING_SHOW':false
}
const store = createStore(reducer,initValue)
export default store