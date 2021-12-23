
export const getCollectionsSuccess = (collections) => ({
    type: 'GET_COLLECTIONS_SUCCESS',
    payload: {
        collections
    }
})

export const selectCollection = (collection) => ({
    type: 'SELECT_COLLECTION',
    payload: {
        collection
    }
})

export const saveLocalEditedCollection = (collection) => ({
    type: 'SAVE_LOCAL_EDITED_COLLECTION',
    payload: {
        collection
    }
})

export const addGameToCollection = (game) => ({
    type: 'ADD_GAME_TO_COLLECTION',
    payload: {
        game
    }
})

export const removeGameToCollection = (game) => ({
    type: 'REMOVE_GAME_TO_COLLECTION',
    payload: {
        game
    }
})