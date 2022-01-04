
const reducer = (state, action) => {
    const {match, question} = action.payload != undefined ? action.payload : {}
    switch (action.type) {

        case 'UPDATE_MATCH': {
            console.log("Update match:", match)
            return {
                ...state,
                match: {...match}
            }
        }

        case 'VIEW_QUESTION': {
            return {
                ...state,
                question
            }
        }
        default: 
            return state
    }
}

export default reducer