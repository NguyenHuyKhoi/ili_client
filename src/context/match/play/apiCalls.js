
import axios from 'axios'
import {createMatchSuccess, generateError, loading } from "./actions"

export const createMatchAPI = async (game, token, dispatch) =>  {
    dispatch(loading())
    try {
        console.log('Game',token, game)
        const res = await axios.post('match/',game, {
            headers: {
                'x-access-token': token
            }
        })    
        const match = res.data
        console.log("Match Create: ",match)
        dispatch(createMatchSuccess(match))
    }catch (err) {
        console.log('Create match error :', err.response.data)
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}