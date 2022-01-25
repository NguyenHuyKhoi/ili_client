
const reducer = (state, action) => {
    const {matches, match} = action.payload !== undefined ? action.payload : {}
    switch (action.type) {
        case 'GET_MATCHES_SUCCESS': 
            return {
                ...state,
                matches
            }
        case 'SELECT_MATCH': 
            return {
                ...state,
                match
            }
        default: 
            return state
    }
}

export default reducer