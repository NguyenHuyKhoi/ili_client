
export const getGamesSuccess = (games) => ({
    type: 'GET_GAMES_SUCCESS',
    payload: {
        games
    }
})

export const selectGame = (game) => ({
    type: 'SELECT_GAME',
    payload: {
        game
    }
})

