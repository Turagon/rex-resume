import { createStore, combineReducers } from 'redux'
import workReducer from './workExp_reducer'
import userReducer from './user_reducer'
import educationReducer from './education_reducer'

const rootReducer = combineReducers({
  workReducer,
  userReducer,
  educationReducer
}) 

export default createStore(rootReducer)