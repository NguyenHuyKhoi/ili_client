export const generateError = (error) => ({
    type: 'GENERATE_ERROR',
    payload: {
        error
    }
})

export const loading = () => ({
    type: 'LOADING'
})

export const resetState = () => ({
    type: 'RESET_STATE'
})
export const getCollectionLibrarySuccess = (collections) => ({
    type: 'GET_COLLECTION_LIBRARY_SUCCESS',
    payload: {
        collections
    }
})

export const createCollectionSuccess = (collection) => ({
    type: 'CREATE_COLLECTION_SUCCESS',
    payload: {
        collection
    }
})

export const editCollectionSuccess = (collection) => ({
    type: 'EDIT_COLLECTION_SUCCESS',
    payload: {
        collection
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