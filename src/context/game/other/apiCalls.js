
import axios from 'axios'
import { generateError, getCompleteGamesSuccess, loading, searchGamesSuccess } from "./actions"

export const getCompleteGamesAPI = async (token, dispatch) =>  {
    dispatch(loading())
    try {
        const res = await axios.get('game/completes', {
            headers: {
                'x-access-token': token
            }
        })    
        const games = res.data
        dispatch(getCompleteGamesSuccess(games))
    }catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}

export const searchGamesAPI = async (token, dispatch) =>  {
    dispatch(loading())
    try {
        const res = await axios.get('game/search', {
            headers: {
                'x-access-token': token
            }
        })    
        const games = res.data
        console.log("Games searchs: ",games)
        dispatch(searchGamesSuccess(games))
    }catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}