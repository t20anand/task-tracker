import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from './CombinedReducer';
import api from './Middleware/api';

export default function ConfigureAppStore(){
    return configureStore({
        reducer,
        middleware:[
            ...getDefaultMiddleware(),
            api
        ]    
    })
}