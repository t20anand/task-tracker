import {combineReducers} from '@reduxjs/toolkit';
import entitiesReducer from './Entities';
// import categorysReducer from './CategorySetup'

export default combineReducers({
    entities: entitiesReducer,
    //categorys: categorysReducer
})