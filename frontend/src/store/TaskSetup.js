import {createSlice} from '@reduxjs/toolkit';
import {apiCallBegan} from './api';
import requests from '../ApiRequests/ApiRequest';
import { AuthHeader } from '../Config/HeaderType';
import {toast} from 'react-toastify';


const slice = createSlice({
    name: 'task',
    initialState: {
        result: [],
        loading: false,
        getDataById:{},               
        error: []
    },
    reducers:{
        taskRequested:(task,action)=>{
            task.loading = true;
        },
        taskReceived:(task,action)=>{
            task.loading = false;
            task.result = action.payload.data?.taskList;
        },
        taskRequestFailed:(task,action)=>{
            task.loading = false;
            task.error = action.payload;
            toast.error(action.payload?.status)
        },
        taskAddedEdited:(task,action)=>{
            task.loading = false;
        },
        gettask:(task,action)=>{
            task.loading = false;
            task.getData = action.payload
        },
        gettaskById:(task,action)=>{
            task.loading = false;
            task.getDataById = action.payload?.data?.task
        },
    }
})

const {
    taskAddedEdited,   
    gettaskById,
    taskRequested,
    taskRequestFailed,
    taskReceived
} = slice.actions

export default slice.reducer;

export const loadtask = (queryParam) => apiCallBegan({
    url:`${requests.getTask}?${queryParam??''}`,
    method:'GET',
    headers:AuthHeader,
    onStart:taskRequested.type,
    onSuccess:taskReceived.type,
    onError: taskRequestFailed.type
})
export const addtask = (data) => apiCallBegan({
    url:requests.createTask ,  
    method:"post",
    headers:AuthHeader,
    data:data,
    onStart:taskRequested.type,
    onSuccess:taskAddedEdited.type,
    onError: taskRequestFailed.type
})
export const gettaskDetails = (id) => apiCallBegan({
    url:`${requests.getTask}/${id}`,
    method:'get',
    headers:AuthHeader,
    onStart:taskRequested.type,
    onSuccess:gettaskById.type,
    onError: taskRequestFailed.type
})
export const edittask = (taskId, data) => apiCallBegan({
    url:`${requests.updateTaskById}/${taskId}` ,
    method:"put",
    data:data,
    headers:AuthHeader,
    onStart:taskRequested.type,
    onSuccess:taskAddedEdited.type,
    onError: taskRequestFailed.type
})
export const completetask = (taskId) => apiCallBegan({
    url:`${requests.completeTaskById}/${taskId}` ,
    method:"patch",
    headers:AuthHeader,
    onStart:taskRequested.type,
    onSuccess:taskAddedEdited.type,
    onError: taskRequestFailed.type
})
export const deletetask = (taskId) => apiCallBegan({
    url:`${requests.updateTaskById}/${taskId}`,
    method:"delete",
    headers:AuthHeader,
    onStart:taskRequested.type,
    onSuccess:taskAddedEdited.type,
    onError: taskRequestFailed.type
})