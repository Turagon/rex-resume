import { createStore, combineReducers } from 'redux'
import workReducer from './workExp_reducer'
import userReducer from './user_reducer'
import educationReducer from './education_reducer'
import personReducer from './personInfo_reducer'
import skillReducer from './skill_reducer'

const rootReducer = combineReducers({
  workReducer,
  userReducer,
  educationReducer,
  personReducer,
  skillReducer
}) 

export default createStore(rootReducer)