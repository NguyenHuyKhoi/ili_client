import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"
export const sample_match = {
}

const INITIAL_STATE = () => {
    let state = {
        match: {},
        question: {},
        answer_counts: [0,0,0,0]
    }
    const saved = localStorage.getItem('match_play_context')
    if (saved) {
        return{
            ...state,
            ...JSON.parse(saved)
        }
    }
    else {
        return {
            ...state,
            ...sample_match
        }
    }
}


export const MatchPlayContext = createContext(reducer)

export const MatchPlayContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE())
    useEffect(() => {
        localStorage.setItem('match_play_context', JSON.stringify(state))
        return () => {
            
        }
    }, [state])
    return <MatchPlayContext.Provider
        value = {{
            match: state.match,
            question: state.question,
            answer_counts: state.answer_counts,
            dispatch
        }}>
        {
            children
        }
    </MatchPlayContext.Provider>
}