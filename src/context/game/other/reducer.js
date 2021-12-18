import { sample_game, sample_question } from "./context"

const reducer = (state, action) => {
    const {games, game} = action.payload != undefined ? action.payload : {}
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
                message: '',
                isSuccess: false
            }
        case 'GENERATE_ERROR':
            return {
                ...state,
                isLoading: false,
                message: action.payload.error,
                isSuccess: false
            }
        case 'RESET_STATE': {
            return {
                ...state,
                isLoading: false,
                message: false,
                isSuccess: false
            }
        }
        case 'GET_COMPLETE_GAMES_SUCCESS': 
            console.log("Games ",games)
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                games,
                game: games.length >0 ? games[0] : {}
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