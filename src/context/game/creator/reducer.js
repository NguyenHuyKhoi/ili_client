import { sample_game, sample_question } from "./context"

const validateQuestion = (question) => {
    let defs = []
    let {title, answers, correct_answers} = question
    // Check title is missing:
    if (title == "" || title == null) {
        defs.push('Question missing')
    } 
    // Check answers is missing
    let emptyAnswers = answers.filter((item) => item == null).length
    if (emptyAnswers > 0) {
        defs.push(emptyAnswers + ' answers missing')
    }

    // Check correct answer is selected: 
    if (correct_answers.length == 0) {
        defs.push('Correct answers not selected')
    }
    //console.log("Validate :", defs)
    return defs
}

const validateGameSetting = (game) => {
    const {title} = game
    // Check title is missing:
    if (title == null || title == '') {
        return false
    }

    return true

}

const reducer = (state, action) => {
    const {question, index, setting} = action.payload != undefined ? action.payload : {}
    switch (action.type) {
        case 'UPDATE_GAME_SETTING':
            return {
                ...state,
                ...setting
            }
        case 'VALIDATE_GAME':
            state.isValidated = validateGameSetting(state)
            state.questions.forEach((item, index) => item.defectives = validateQuestion(item)) 
            return {
                ...state
            }
        case 'SELECT_QUESTION': 
            state.questionIndex = index
            return {
                ...state
            }
        
        case 'ADD_QUESTION':
            state.questions.push(sample_question)
            return {
                ...state
            }
        case 'DUPLICATE_QUESTION':
            let q = {...state.questions[index]}
            state.questions.splice(index, 0, q)
            return {
                ...state
            }
        case 'UPDATE_QUESTION':
            state.questions[index] = question
            return {
                ...state
            }
        case 'DELETE_QUESTION':
            state.questions.splice(index,1)
            if (index <= state.questionIndex) {
                state.questionIndex = Math.max(0, state.questionIndex - 1)
            }
            return {
                ...state
            }
    
        case 'START_CREATE_GAME': {
            return {
                ...sample_game,
                mode: 'create',
                questionIndex: 0
            }
        }

        case 'START_EDIT_GAME': {
            return {
                ...action.payload.game,
                mode: 'edit',
                questionIndex: 0
            }
        }
        default: 
            return state
    }
}

export default reducer