
const reducer = (state, action) => {
    const {collections, collection, game} = action.payload != undefined ? action.payload : {}
    
    let games
    switch (action.type) {
        case 'GET_COLLECTIONS_SUCCESS': 
            return {
                ...state,
                collections
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
            state.collection.games.push(game)
            return {
                ...state
            }
        case 'REMOVE_GAME_TO_COLLECTION':
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