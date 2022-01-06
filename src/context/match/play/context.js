import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"
export const LIVESTREAM_STAGE = {
    NON_CREATED: 0,
    CREATING: 1,
    WAITING_ON_LIVE: 2,
    ON_LIVE: 3,
    END: 4
}

export const sample_match = {
    game: {},
    livestream: {}
}

const INITIAL_STATE = () => {
    let state = {
        match: {},
        question: {},
        answer_counts: [0,0,0,0],
        livestreamStage: LIVESTREAM_STAGE.NON_CREATED
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
            match: {...sample_match}
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
            livestream: state.match.livestream,
            livestreamStage: state.livestreamStage,
            dispatch
        }}>
        {
            children
        }
    </MatchPlayContext.Provider>
}