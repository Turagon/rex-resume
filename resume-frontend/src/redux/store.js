import { createStore, combineReducers } from 'redux'
import workReducer from './workExp_reducer'
import userReducer from './user_reducer'

const rootReducer = combineReducers({
  workReducer,
  userReducer
}) 

export default createStore(rootReducer)