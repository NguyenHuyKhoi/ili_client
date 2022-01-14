
const reducer = (state, action) => {
    const {games, game} = action.payload != undefined ? action.payload : {}
    switch (action.type) {
        case 'GET_GAMES_SUCCESS': 
            return {
                ...state,
                games,
                game: games.length > 0? games[0] : null
            }
        case 'SELECT_GAME': 
            console.log("Reducer select game:", game)
            return {
                ...state,
                game: JSON.parse(JSON.stringify(game))
            }
        default: 
            return state
    }
}

export default reducer