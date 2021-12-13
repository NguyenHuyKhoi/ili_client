import { loginStart, loginSuccess, loginFailure, logoutSuccess } from "./actions"
import axios from 'axios'

export const login = async (user, dispatch) =>  {
    dispatch(loginStart())
    try {
       // const res = await axios.post('auth/login', user) 
        const res = {
            data: {
                username: 'username',
                password: '123456',
                email: 'username@gmail.com'
            }
        }
        dispatch(loginSuccess(res.data))
    }catch (err) {
        dispatch(loginFailure())
    }
}


export const logout = async (dispatch) =>  {
    try {
       // const res = await axios.post('auth/login', user) 
        dispatch(logoutSuccess())
    }catch (err) {
    }
}