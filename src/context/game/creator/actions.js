export const startCreateGame = () => ({
    type: 'START_CREATE_GAME'
})

export const startEditGame = (game) => ({
    type: 'START_EDIT_GAME',
    payload: {
        game
    }
})

export const updateGameSetting = (setting) => ({
    type: 'UPDATE_GAME_SETTING',
    payload: {
        setting
    }
})

export const validateGame = () => ({
    type: 'VALIDATE_GAME'
})

export const selectQuestion = (index) => ({
    type: 'SELECT_QUESTION',
    payload: {
        index
    }
})

export const addQuestion = (type) => ({
    type: 'ADD_QUESTION',
    payload: {
        type
    }
})


export const duplicateQuestion = (index) => ({
    type: 'DUPLICATE_QUESTION',
    payload: {
        index
    }
})

export const updateQuestion = (question, index) => ({
    type: 'UPDATE_QUESTION',
    payload: {
        question,
        index
    }
})

export const deleteQuestion = (index) => ({
    type: 'DELETE_QUESTION',
    payload: {
        index
    }
})