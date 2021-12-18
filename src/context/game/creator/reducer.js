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
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
                message: '',
                isSuccess: false
            }
        case 'GENERATE_ERROR':
            return {
                ...state,
                isLoading: false,
                message: action.payload.error,
                isSuccess: false
            }
        case 'RESET_STATE': {
            console.log("Call reset state")
            return {
                ...state,
                isLoading: false,
                message: false,
                isSuccess: false
            }
        }
        case 'UPDATE_GAME_SETTING':
            //console.log("Update setting reducer ", setting)
            return {
                ...state,
                ...setting
            }
        case 'VALIDATE_GAME':
            //console.log("Validate game")
            state.isValidated = validateGameSetting(state)
            state.questions.forEach((item, index) => item.defectives = validateQuestion(item)) 
            return {
                ...state
            }
        case 'SELECT_QUESTION': 
            state.question_index = index
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
            //console.log("Inset question at:", index)
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
            if (index <= state.question_index) {
                state.question_index = Math.max(0, state.question_index - 1)
            }
            return {
                ...state
            }
        case 'CREATE_GAME_SUCCESS': {
            console.log('Create succcess')
            return {
                ...state,
                isLoading: false,
                message: 'Create game successfully',
                isSuccess: true
            }
        }

        case 'EDIT_GAME_SUCCESS': {
            console.log("Edit success")
            return {
                ...state,
                isLoading: false,
                message: 'Edit game successfully',
                isSuccess: true
            }
        }

        case 'START_CREATE_GAME': {
            return {
                ...state,
                ...sample_game,
                mode: 'create'
            }
        }

        case 'START_EDIT_GAME': {
            return {
                ...state,
                ...action.payload.game,
                mode: 'edit'
            }
        }
        default: 
            return state
    }
}

export default reducer