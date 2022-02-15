import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"
export const LIVESTREAM_STAGE = {
    NON_CREATED: 0,
    CREATING: 1,
    READY: 2,
    LIVE: 3,
    COMPLETE: 4
}

export const sample_match = {
    game: {},
    livestream: null,
    delayStartTime: 0,
    showQuestionEndTime: 20,
    showLeaderboardTime: 10,
    delayEndTime: 20,
}

const INITIAL_STATE = () => {
    let state = {
        match: JSON.parse(JSON.stringify(sample_match)),
        question: {},
        answer_counts: [],
        livestreamStage: LIVESTREAM_STAGE.NON_CREATED
    }
    const saved = localStorage.getItem('match_play_context')
    if (saved) {
        return JSON.parse(saved)
        
    }
    else {
        return state
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