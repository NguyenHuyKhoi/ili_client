import { generateError ,loading, profileEditSuccess} from "./actions"
import axios from 'axios'
import { updateUserInfor } from "../auth/actions"

export const profileEdit = async (data, user,  dispatch, authDispatch) =>  {
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
