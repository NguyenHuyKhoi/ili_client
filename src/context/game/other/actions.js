export const generateError = (error) => ({
    type: 'GENERATE_ERROR',
    payload: {
        error
    }
})


export const loading = () => ({
    type: 'LOADING'
})

export const getCompleteGamesSuccess = (games) => ({
    type: 'GET_COMPLETE_GAMES_SUCCESS',
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