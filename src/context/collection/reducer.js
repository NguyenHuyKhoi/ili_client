import { sample_collection } from "./context"

const reducer = (state, action) => {
    const {collections, collection, game} = action.payload !==undefined ? action.payload : {}
    
    var temp, temps
    switch (action.type) {
        case 'GET_COLLECTIONS_SUCCESS': 
            return {
                ...state,
                collections: JSON.parse(JSON.stringify(collections)),
                collection: collections.length > 0 ? collections[0] : null
            }
        case 'SELECT_COLLECTION': 
            return {
                ...state,
                collection: JSON.parse(JSON.stringify(collection))
            }
        case 'START_CREATE_COLLECTION':
            return {
                ...state,
                collection: {...sample_collection},
                mode: 'create'
            }
        case 'START_EDIT_COLLECTION': 
            return {
                ...state,
                collection,
                mode: 'edit'
            }
            return 
        case 'SAVE_COLLECTION_SETTING': 
            return {
                ...state,
                collection
            }
        case 'ADD_GAME_TO_COLLECTION':
            console.log("Add game to collections")
            temps = JSON.parse(JSON.stringify(state.collection.games))
            temp = JSON.parse(JSON.stringify(game))
            temps.push(temp)
            return {
                ...state,
                collection: {
                    ...state.collection,
                    games: temps
                }
            }
        case 'REMOVE_GAME_TO_COLLECTION':
            temps = JSON.parse(JSON.stringify(state.collection.games))
            temps = temps.filter((item) => item._id !==game._id)
            return {
                ...state,
                collection: {
                    ...state.collection,
                    games: temps
                }
            }
        default: 
            return state
    }
}

export default reducer