import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from './api';
import requests from '../ApiRequests/ApiRequest';
import {AuthHeader} from '../Config/HeaderType';
import {toast} from 'react-toastify';


const slice = createSlice({
    name: 'priority',
    initialState: {
        result: [],
        loading: false,               
        error: []
    },
    reducers:{
        priorityRequested:(priority,action)=>{
            priority.loading = true;
        },
        priorityReceived:(priority,action)=>{
            priority.loading = false;
            priority.result = action.payload?.data?.priorityList;
        },
        priorityRequestFailed:(priority,action)=>{
            priority.loading = false;
            priority.error = action.payload;
            toast.error(action.payload?.status)
        },
        priorityAddedEdited:(priority,action)=>{
            priority.loading = false;
            toast.success(action.payload?.status)
        },
        getpriority:(priority,action)=>{
            priority.loading = false;
            priority.getData = action.payload
        },
        getpriorityById:(priority,action)=>{
            priority.loading = false;
            priority.getDataById = action.payload
        },
    }
})

const {
    priorityAddedEdited,   
    getpriorityById,
    priorityRequested,
    priorityRequestFailed,
    priorityReceived
} = slice.actions

export default slice.reducer;

export const loadpriority = () => apiCallBegan({
    url:requests.getPriority,
    method:'GET',
    headers:AuthHeader,
    onStart:priorityRequested.type,
    onSuccess:priorityReceived.type,
    onError: priorityRequestFailed.type
})
export const addpriority = (data) => apiCallBegan({
    url:requests.createPriority ,  
    method:"post",
    headers:AuthHeader,
    data:data,
    onStart:priorityRequested.type,
    onSuccess:priorityAddedEdited.type,
    onError: priorityRequestFailed.type
})
export const editpriority = (priorityId, data) => apiCallBegan({
    url:`${requests.updatePriorityById}/${priorityId}` ,
    method:"put",
    data:data,
    headers:AuthHeader,
    onStart:priorityRequested.type,
    onSuccess:priorityAddedEdited.type,
    onError: priorityRequestFailed.type
})
export const deletepriority = (priorityId) => apiCallBegan({
    url:`${requests.deletePriorityById}/${priorityId}`,
    method:"delete",
    headers:AuthHeader,
    onStart:priorityRequested.type,
    onSuccess:priorityAddedEdited.type,
    onError: priorityRequestFailed.type
})
export const getpriorityDetails = (priorityId) => apiCallBegan({
    url:`${requests.getPriority}/${priorityId}`,
    method:'get',
    headers:AuthHeader,
    onStart:priorityRequested.type,
    onSuccess:getpriorityById.type,
    onError: priorityRequestFailed.type
})
