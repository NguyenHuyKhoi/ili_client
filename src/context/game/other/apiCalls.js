
import axios from 'axios'
import { generateError, getCompleteGamesSuccess, loading } from "./actions"

export const getCompleteGameAPI = async (token, dispatch) =>  {
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