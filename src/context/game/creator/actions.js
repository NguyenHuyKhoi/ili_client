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