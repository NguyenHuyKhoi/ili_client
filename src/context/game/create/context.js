import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

export const sample_question = {
    title: null,
    image: null,
    answers: [
        null,
        null,
        null,
        null
    ],
    correct_answers: [],
    time_limit: null
}

const sample_game = {
    title: null,
    description: null,
    cover: null,
    language: null,
    visibility: null,
    question_index: 0,
    questions: [{...sample_question}]
}

const INITIAL_STATE = () => {
    const saved = localStorage.getItem('game_creator')
    if (saved) {
        return JSON.parse(saved)
    }
    else {
        return {...sample_game}
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
            dispatch
        }}>
        {
            children
        }
    </GameCreatorContext.Provider>
}