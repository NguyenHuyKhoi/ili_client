import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

export const sample_match = {
}

const INITIAL_STATE = () => {
    let state = {
        isLoading: false,
        isSuccess: false,
        message: ''
    }
    const saved = localStorage.getItem('match_play_creator')
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
        localStorage.setItem('match_play_creator', JSON.stringify(state))
        return () => {
            
        }
    }, [state])
    return <MatchPlayContext.Provider
        value = {{
            match: state,
            isLoading: state.isLoading,
            message: state.message,
            isSuccess: state.isSuccess,
            dispatch
        }}>
        {
            children
        }
    </MatchPlayContext.Provider>
}