
const reducer = (state, action) => {
    const {match} = action.payload != undefined ? action.payload : {}
    switch (action.type) {

        case 'UPDATE_MATCH': {
            return {
                ...state,
                match
            }
        }
        default: 
            return state
    }
}

export default reducer