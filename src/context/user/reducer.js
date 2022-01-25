const reducer = (state, action) => {
    const {user} = action.payload !== undefined ? action.payload : {}
    switch (action.type) {
        case 'PROFILE_DETAIL_SUCCESS': 
            return{
                ...state,
                user
            }
        default: 
            return state
    }
}

export default reducer