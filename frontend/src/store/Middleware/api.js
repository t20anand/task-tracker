
import axios from '../../axios/axios';
import * as actions from '../api';

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, headers, data, options, onStart, onSuccess, onError, onDismiss, onUpload } = action.payload;

    if (onDismiss) {
        dispatch({ type: onDismiss })
        return;
    }

    if (onStart)
        dispatch({ type: onStart });

    next(action);

    try {
        let response;
        axios.defaults.withCredentials = true;

        if (options) {
            response = await axios.request({
                url,
                method,
                headers,
                data,
                onUploadProgress: ProgressEvent => {
                    const { loaded, total } = ProgressEvent
                    let percent = parseInt(Math.floor((loaded * 100) / total));
                    
                    dispatch({ type: onUpload, payload: { percent, loaded, total } })
                }
            })
        } else {
            response = await axios.request({
                url,
                method,
                headers,
                data,
            });
        }

        //General actions    
        dispatch(actions.apiCallSuccess(response?.data));

        //specific actions
        if (onSuccess) {
            dispatch({ type: onSuccess, payload: response.data })
        }
    } catch (error) {
        //General approach
        dispatch(actions.apiCallFailed(error.message))
        //specific
        if (onError) dispatch({ type: onError, payload: error.response?.data })
    }
}

export default api;