import {combineReducers} from '@reduxjs/toolkit';
import PriorityReducers from './PrioritySetup'
import TaskReducers from './TaskSetup'

export default combineReducers({
    priority: PriorityReducers,
    task:TaskReducers
})