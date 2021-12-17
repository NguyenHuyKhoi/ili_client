import { loginSuccess, logoutSuccess, signupSuccess, generateError ,loading, requestResetPasswordSuccess, resetPasswordSuccess, changePasswordSuccess} from "./actions"
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

export const logout = async (user, dispatch) =>  {
    dispatch(loading())
    try {
        const res = await axios.post('auth/logout', null, {
            headers: {
                'x-access-token': user.accessToken
            }
        })    

        dispatch(logoutSuccess())
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

export const requestResetPassword = async (data, dispatch) => {
    dispatch(loading())
    try {
        const res = await axios.post('auth/forgot-password', data)
        console.log("reset link", res.data)
        dispatch(requestResetPasswordSuccess())
    }
    catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
} 

export const resetPassword = async (data, token, dispatch) => {
    dispatch(loading())
    try {
        const url = 'auth/reset-password' + 
            (token == undefined || token =='' ? '':`?token=${token}`)
        console.log("Url :", url)
        const res = await axios.post(url, data)
        dispatch(resetPasswordSuccess())
    }
    catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
} 

export const changePassword = async (data, token, dispatch) => {
    dispatch(loading())
    try {
        const url = 'auth/change-password' + 
            (token == undefined || token =='' ? '':`?token=${token}`)
        const res = await axios.post(url, data)
        dispatch(changePasswordSuccess())
    }
    catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
} 

