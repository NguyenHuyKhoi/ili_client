import {sampleAction} from "./movieActions"
import axios from 'axios'

export const getSample = async ( dispatch) =>  {
    dispatch(sampleAction())
    try {
        const res = await axios.get('/movies', {
            headers:{
                token: 'Bearer ' + ""
            }
        })
        dispatch(getMoviesSuccess(res.data))
    }catch (err) {
        dispatch(getMoviesFailure())
    }
}

export const createMovie = async (movie, dispatch) =>  {
    dispatch(createMovieStart())
    try {
        const res = await axios.post('/movies/', movie, {
            headers:{
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        })
        dispatch(createMovieSuccess(res.data))
    }catch (err) {
        dispatch(createMovieFailure())
    }
}


export const deleteMovie = async (id, dispatch) =>  {
    dispatch(deleteMovieStart())
    try {
        await axios.delete('/movies/'+ id, {
            headers:{
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        })
        dispatch(deleteMovieSuccess(id))
    }catch (err) {
        dispatch(deleteMovieFailure())
    }
}