
import axios from 'axios'
import { createGameSuccess, generateError, loading } from "./actions"

export const createGameAPI = async (game, token, dispatch) =>  {
    dispatch(loading())
    try {
        console.log("create game: ", game)
        await axios.post('game/', game, {
            headers: {
                'x-access-token': token
            }
        })    

        dispatch(createGameSuccess())
    }catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}