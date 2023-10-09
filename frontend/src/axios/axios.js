import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import requests from '../ApiRequests/ApiRequest';
import { AUTH_TOKEN_KEY } from '../Config/constant';
import { setLocalStorage } from '../utils/localStorageHandler';

const baseUrl = process.env.REACT_APP_BASE_URL
const instance = axios.create({
    baseURL: baseUrl
});
const tokenRefresh = async failedRequest => {
    try {   
         
        await instance.post(requests.refreshToken,{refreshToken:localStorage.getItem('Usrrf')}).then(response => {
            const accessToken = response.data?.data?.accessToken; 

            failedRequest.response.config.headers['Authorization'] = 'Bearer '+accessToken
            
            setLocalStorage(AUTH_TOKEN_KEY.accessTokenKey, accessToken)
              
        },error=>{    
            console.log(error);       
            if(error.response?.status === 400){   
                // window.location='/login'
            }
            if(error.response?.status === 401){          
                window.location='/login'
            }
        })       
        
    } catch (error) {    
        return error
    }
}

createAuthRefreshInterceptor(
    instance,
    tokenRefresh,
    {
        skipWhileRefreshing: false,
        
    }
)

instance.interceptors.request.use(request => {
    
    return request;
}, (error) => {
      console.log("err",error)
})

export { baseUrl };
export default instance;