
import axios from 'axios'
import {createMatchSuccess, generateError, loading } from "./actions"
import { createMatch } from './socketHandler'

export const createMatchAPI = async (game, host, dispatch) =>  {
    dispatch(loading())
    try {
        const {accessToken} = host
        const res = await axios.post('match/',game, {
            headers: {
                'x-access-token': accessToken
            }
        })    
        const match = res.data
        dispatch(createMatchSuccess(match))
        createMatch(host, match, dispatch)

    }catch (err) {
        console.log('Create match error :', err.response.data)
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}