import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"
export const QUESTION_TYPES_ID = {
    MULTIPLE_CHOICE: 0,
    TF_CHOICE: 1,
    PIC_WORD: 2,
    WORD_TABLE: 3
}

export const WORD_TABLE_SIZE = 12

export const QUESTION_TYPES = [
    {
        type: 'Multiple Choice',
        id: QUESTION_TYPES_ID.MULTIPLE_CHOICE,
        time_limits: [10,20,30],
        scores: [500, 1000, 1500],
        sample: {
            index: 0,
            typeName: 'Multiple Choice',
            typeId: QUESTION_TYPES_ID.MULTIPLE_CHOICE,
            title: null,
            image: null,
            answers: [
                null,
                null,
                null,
                null
            ],
            correct_answer: null,
            time_limit: 20,
            score: 1000
        }
    },
    {
        type: 'True/False',
        id: QUESTION_TYPES_ID.TF_CHOICE,
        time_limits: [10,20,30],
        scores: [500, 1000, 1500],
        sample: {
            index: 0,
            typeName: 'True/False',
            typeId: QUESTION_TYPES_ID.TF_CHOICE,
            title: null,
            image: null,
            answers: ['True', 'False'],
            correct_answer: null,
            time_limit: 20,
            score: 1000
        }
    },
    {
        type: '4 Pic 1 Word',
        scores: [500, 1000, 1500],
        time_limits: [10,20,30],
        id: QUESTION_TYPES_ID.PIC_WORD,
        sample: {
            index: 0,
            typeName: '4 Pic 1 Word',
            typeId: QUESTION_TYPES_ID.PIC_WORD,
            title: null,
            images: [null, null, null, null],
            correct_answer: null,
            time_limit: 20,
            score: 1000,
        }
    },
    {
        type: 'Word table',
        id: QUESTION_TYPES_ID.WORD_TABLE,
        scores: [200, 300, 500],
        time_limits: [60,120,300],
        sample: {
            index: 0,
            typeName: 'Word table',
            typeId: QUESTION_TYPES_ID.WORD_TABLE,
            title: null,
            correct_answers: [],
            char_table: new Array(WORD_TABLE_SIZE * WORD_TABLE_SIZE),
            time_limit: 60,
            score: 500
        }
    }
]
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