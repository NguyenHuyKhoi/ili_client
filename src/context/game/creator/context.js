import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

export const sample_question = {
    index: 0,
    title: null,
    image: null,
    answers: [
        null,
        null,
        null,
        null
    ],
    correct_answers: [],
    time_limit: 20,
    score: 1000
}

export const sample_game = {
    title: null,
    description: null,
    cover: null,
    visibility: 'private',
    subject: 'others',
    questionIndex: 0,
    questions: [JSON.parse(JSON.stringify(sample_question))]
}

const INITIAL_STATE = () => {
    let newState = JSON.parse(JSON.stringify(sample_game))
    newState.state = 'create' 
    const saved = localStorage.getItem('game_creator')
    if (saved) {
        return JSON.parse(saved)
    }
    else {
        return newState
    }
}


export const GameCreatorContext = createContext(reducer)

export const GameCreatorContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE())
    useEffect(() => {
        localStorage.setItem('game_creator', JSON.stringify(state))
        return () => {
            
        }
    }, [state])
    return <GameCreatorContext.Provider
        value = {{
            game: state,
            mode: state.mode,
            dispatch
        }}>
        {
            children
        }
    </GameCreatorContext.Provider>
}