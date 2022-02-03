import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

const INITIAL_STATE = () => {
    let state = {
        question: null,
        questions: []
    }
    const saved = localStorage.getItem('question_bank_context')
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


export const QuestionBankContext = createContext(reducer)

export const QuestionBankContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE())
    useEffect(() => {
        localStorage.setItem('question_bank_context', JSON.stringify(state))
        return () => {
            
        }
    }, [state])
    return <QuestionBankContext.Provider
        value = {{
            questions: state.questions,
            question: state.question,
            dispatch
        }}>
        {
            children
        }
    </QuestionBankContext.Provider>
}