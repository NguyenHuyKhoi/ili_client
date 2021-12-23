import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

const INITIAL_STATE = () => {
    let state = {
        game: null,
        games: []
    }
    const saved = localStorage.getItem('game_context')
    if (saved) {
        return{
            ...state,
            ...JSON.parse(saved)
        }
    }
    else {
        return {
            ...state
        }
    }
}


export const GameContext = createContext(reducer)

export const GameContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE())
    useEffect(() => {
        localStorage.setItem('game_context', JSON.stringify(state))
        return () => {
            
        }
    }, [state])
    return <GameContext.Provider
        value = {{
            games: state.games,
            game: state.game,
            dispatch
        }}>
        {
            children
        }
    </GameContext.Provider>
}