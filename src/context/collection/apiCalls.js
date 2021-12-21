
import axios from 'axios'
import { createCollectionSuccess, editCollectionSuccess, generateError, getCollectionLibrarySuccess, loading } from "./actions"

export const createCollectionAPI = async (collection, token, dispatch) =>  {
    dispatch(loading())
    try {
        await axios.post('collection/', collection, {
            headers: {
                'x-access-token': token
            }
        })    
        dispatch(createCollectionSuccess())
    }catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}

export const editCollectionAPI = async (collection, token, dispatch) =>  {
    dispatch(loading())
    try {
        const gameIds = collection.games.map((item) => item._id)
        collection.games = [...gameIds]
        await axios.put('collection/'+collection._id, collection, {
            headers: {
                'x-access-token': token
            }
        })    
        dispatch(editCollectionSuccess())
    }catch (err) {
        console.log("error:", err)
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}

export const getCollectionLibraryAPI = async (userId, token, dispatch) =>  {
    dispatch(loading())
    try {
        const res = await axios.get('collection/library/' + userId, {
            headers: {
                'x-access-token': token
            }
        })    
        const collections = res.data
        console.log("collections :", collections)
        dispatch(getCollectionLibrarySuccess(collections))
    }catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}