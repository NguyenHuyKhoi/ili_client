
const reducer = (state, action) => {
    const {collections, collection, game} = action.payload != undefined ? action.payload : {}
    
    let games
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
        case 'RESET_STATE': {
            return {
                ...state,
                isLoading: false,
                message: false,
                isSuccess: false
            }
        }
        case 'GET_COLLECTION_LIBRARY_SUCCESS': 
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                collections,
                collection: collections.length >0 ? collections[0] : {}
            }
        case 'CREATE_COLLECTION_SUCCESS': 
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                message: 'Create Collection successfully'
            }
        case 'EDIT_COLLECTION_SUCCESS': 
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                message: 'Edit Collection successfully'
            }
        case 'SELECT_COLLECTION': 
            return {
                ...state,
                collection
            }
        case 'SAVE_LOCAL_EDITED_COLLECTION': 
            console.log("Save local")
            return {
                ...state,
                collection
            }
        case 'ADD_GAME_TO_COLLECTION':
            console.log("Add game to collection", game)
            state.collection.games.push(game)
            return {
                ...state
            }
        case 'REMOVE_GAME_TO_COLLECTION':
            console.log("remove game to collection", game)
            games = state.collection.games.filter((item) => item._id != game._id)
            return {
                ...state,
                collection: {
                    ...state.collection,
                    games
                }
            }
        default: 
            return state
    }
}

export default reducer