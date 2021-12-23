
import axios from 'axios'
import { createGameSuccess, editGameSuccess, generateError, loading } from "./actions"

export const createGameAPI = async (game, token, dispatch) =>  {
    dispatch(loading())
    try {
        await axios.post('game/', game, {
            headers: {
                'x-access-token': token
            }
        })    

        dispatch(createGameSuccess())
    }catch (err) {
        const {error} = err.response.data
        console.log("Error :", error)
        dispatch(generateError(error))
    }
}

export const editGameAPI = async (game, token, dispatch) =>  {
    dispatch(loading())
    try {
        console.log("edit game: ", game)
         await axios.put('game/'+game._id, game, {
            headers: {
                'x-access-token': token
            }
        })    

        dispatch(editGameSuccess())
    }catch (err) {
        const {error} = err.response.data
        console.log("Error :", error)
        dispatch(generateError(error))
    }
}
