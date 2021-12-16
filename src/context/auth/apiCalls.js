import { loginSuccess, logoutSuccess, signupSuccess, generateError ,loading, requestResetPasswordSuccess, resetPasswordSuccess} from "./actions"
import axios from 'axios'

export const login = async (user, dispatch) =>  {
    dispatch(loading())
    try {
        console.log("User ", user)
        const res = await axios.post('auth/login', user)    
        dispatch(loginSuccess(res.data))
    }catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}

export const signup = async (user, dispatch) => {
    dispatch(loading())
    try {
        const res = await axios.post('auth/signup', user)
        dispatch(signupSuccess())
    }
    catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}

export const requestResetPassword = async (user, dispatch) => {
    dispatch(loading())
    try {
        const res = await axios.post('auth/forgot-password', user)
        console.log("reset link", res.data)
        dispatch(requestResetPasswordSuccess())
    }
    catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
} 

export const resetPassword = async (user, token, dispatch) => {
    dispatch(loading())
    try {
        const url = 'auth/reset-password' + 
            (token == undefined || token =='' ? '':`?token=${token}`)
        console.log("Url :", url)
        const res = await axios.post(url, user)
        dispatch(resetPasswordSuccess())
    }
    catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
} 


export const logout = async (dispatch) =>  {
    try {
       // const res = await axios.post('auth/login', user) 
        dispatch(logoutSuccess())
    }catch (err) {
    }
}