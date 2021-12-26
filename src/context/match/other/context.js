import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

const INITIAL_STATE = () => {
    let state = {
        matches: [],
        match: {}
    }
    const saved = localStorage.getItem('match_context')
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


export const MatchContext = createContext(reducer)

export const MatchContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE())
    useEffect(() => {
        localStorage.setItem('match_context', JSON.stringify(state))
        return () => {
            
        }
    }, [state])
    return <MatchContext.Provider
        value = {{
            dispatch,
            matches: state.matches,
            match: state.match
        }}>
        {
            children
        }
    </MatchContext.Provider>
}