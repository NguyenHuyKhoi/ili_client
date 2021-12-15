import { loginStart, loginSuccess, loginFailure, logoutSuccess, signupStart, signupFailure, signupSuccess } from "./actions"
import axios from 'axios'

export const login = async (user, dispatch) =>  {
    dispatch(loginStart())
    try {
        console.log("User ", user)
        const res = await axios.post('auth/login', user)    
        console.log("Throw :", res)
        if (res.status != 200) {
            throw new Error(res.data)
        }
        dispatch(loginSuccess(res.data))
    }catch (err) {
        const {error} = err.response.data
        console.log("Error :", err.response)
        dispatch(loginFailure(error))
    }
}

export const signup = async (user, dispatch) => {
    dispatch(signupStart())
    try {
        const res = await axios.post('auth/signup', user)
        if (res.status != 200) {
            throw new Error(res.data)
        }
        dispatch(signupSuccess())
    }
    catch (err) {
        dispatch(signupFailure(err.error))
    }
}


export const logout = async (dispatch) =>  {
    try {
       // const res = await axios.post('auth/login', user) 
        dispatch(logoutSuccess())
    }catch (err) {
    }
}