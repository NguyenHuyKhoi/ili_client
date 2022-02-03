import { createContext, useEffect, useReducer } from "react"
import { QUESTION_TYPES } from "../../question/creator/context"
import reducer from "./reducer"

export const GAME_SUBJECTS = [
    {label: 'Science', value: 'science'},
    {label: 'Music', value: 'music'},
    {label: 'Cinema', value: 'cinema'},
    {label: 'Sport', value: 'sport'},
    {label: 'Arts', value: 'arts'},
    {label: 'IQ', value: 'iq'},
    {label: 'Others', value: 'others'}
]

export const sample_game = {
    title: null,
    description: null,
    cover: null,
    visibility: 'private',
    subject: 'others',
    questionIndex: 0,
    questions: [JSON.parse(JSON.stringify(QUESTION_TYPES[0].sample))]
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