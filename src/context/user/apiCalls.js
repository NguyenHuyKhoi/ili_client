import { generateError ,loading, profileDetailSuccess, profileEditSuccess} from "./actions"
import axios from 'axios'
import { updateUserInfor } from "../auth/actions"

export const profileEditAPI = async (data, user,  dispatch, authDispatch) =>  {
    dispatch(loading())
    try {
        const res = await axios.put('user/'+ user._id, data, {
            headers: {
                'x-access-token': user.accessToken
            }
        })    
        const updatedUser = res.data
        dispatch(profileEditSuccess(updatedUser))
        authDispatch(updateUserInfor(updatedUser))
    }catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}

export const profileDetailAPI = async (userId, token, dispatch) =>  {
    dispatch(loading())
    try {
        const res = await axios.get('user/'+ userId, {
            headers: {
                'x-access-token': token
            }
        })    
        const updatedUser = res.data
        dispatch(profileDetailSuccess(updatedUser))
    }catch (err) {
        const {error} = err.response.data
        dispatch(generateError(error))
    }
}
