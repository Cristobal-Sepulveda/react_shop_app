import { createStore} from 'redux'
import combineReducers from "./reducers/combineReducers"

export default createStore(combineReducers);
