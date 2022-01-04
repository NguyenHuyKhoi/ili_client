import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"
export const sample_match = {
    game: {}
}

const INITIAL_STATE = () => {
    let state = {
        match: {}
    }
    const saved = localStorage.getItem('match_livestream_context')
    if (saved) {
        return{
            ...state,
            ...JSON.parse(saved)
        }
    }
    else {
        return {
            ...state,
            match: {...sample_match}
        }
    }
}


export const MatchLivestreamContext = createContext(reducer)

export const MatchLivestreamContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE())
    useEffect(() => {
        localStorage.setItem('match_livestream_context', JSON.stringify(state))
        return () => {
            
        }
    }, [state])

    console.log("Export match: ", state.match)
    return <MatchLivestreamContext.Provider
        value = {{
            match: state.match,
            question: state.question,
            dispatch
        }}>
        {
            children
        }
    </MatchLivestreamContext.Provider>
}