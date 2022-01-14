
const reducer = (state, action) => {
    const {games, game} = action.payload != undefined ? action.payload : {}
    switch (action.type) {
        case 'GET_GAMES_SUCCESS': 
            return {
                ...state,
                games
            }
        case 'SELECT_GAME': 
            return {
                ...state,
                game
            }
        default: 
            return state
    }
}

export default reducer