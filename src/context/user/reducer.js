const reducer = (state, action) => {
    const {user} = action.payload != undefined ? action.payload : {}
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
                message: '',
                isSuccess: false
            }
        case 'GENERATE_ERROR':
            return {
                ...state,
                isLoading: false,
                message: action.payload.error,
                isSuccess: false
            }
        case 'PROFILE_EDIT_SUCCESS':
            return {
                ...state,
                isLoading: false,
                message: "Profile Edit Sucessfully",
                isSuccess: true
            }
        case 'PROFILE_DETAIL_SUCCESS': 
            return{
                ...state,
                isLoading: false,
                message: "Profile Edit Sucessfully",
                isSuccess: true,
                user
            }
        default: 
            return state
    }
}

export default reducer