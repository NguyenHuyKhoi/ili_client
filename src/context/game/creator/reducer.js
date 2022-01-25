import { QUESTION_TYPES, QUESTION_TYPES_ID, sample_game } from "./context"

export const validateMultipleQuestion = (question) => {
    let defs = []
    let {title, answers, correct_answer} = question
    // Check title is missing:
    if (title === "" || title === null) {
        defs.push('Title missing')
    } 
    // Check answers is missing
    let emptyAnswers = answers.filter((item) => (item === null) || (item === '')).length
    if (emptyAnswers > 0) {
        defs.push(emptyAnswers + ' answers missing')
    }

    // Check correct answer is selected: 
    if (correct_answer === null) {
        defs.push('Correct answers not selected')
    }
    //console.log("Validate :", defs)
    return defs
}

export const validateTFQuestion = (question) => {
    let defs = []
    let {title, correct_answer} = question
    // Check title is missing:
    if (title === "" || title === null) {
        defs.push('Title missing')
    } 

    // Check correct answer is selected: 
    if (correct_answer === null) {
        defs.push('Correct answers not selected')
    }
    //console.log("Validate :", defs)
    return defs
}
export const cloneQuestion = (question) => {
    var res = JSON.parse(JSON.stringify(question))
    res.images = []
    if (question.images !== undefined) {
        question.images.forEach((item) => res.images = [...res.images, item])
    }
    res.image = question.image 
    return res
}

export const validatePicWordQuestion = (question) => {
    let defs = []
    let {title, images, correct_answer} = question
    // Check title is missing:
    if (title === "" || title === null) {
        defs.push('Title missing')
    } 

    // Check answers is missing
    let emptyImages = images.filter((item) => (item===null || item===undefined)).length
    if (emptyImages===4) {
        defs.push('No hint image')
    }

    // Check correct answer is selected: 
    if (correct_answer===null) {
        defs.push('Correct answers not selected')
    }
    //console.log("Validate :", defs)
    return defs
}

export const validateWordTableQuestion = (question) => {
    let defs = []
    let {title, char_table, correct_answers} = question
    // Check title is missing:
    if (title==="" || title===null) {
        defs.push('Title missing')
    } 

    // Check answers is missing
    let emptyChars = char_table.filter((item) => (item===null || item===undefined)).length
    if (emptyChars > 0) {
        defs.push('Table is not filled')
    }

    // Check correct answer is selected: 
    if (correct_answers.length === 0) {
        defs.push('No keyword is selected')
    }

    // // Check correct answer is selected: 
    // if (correct_answers.length < 5) {
    //     defs.push('Please enter at least 5 keywords')
    // }
    //console.log("Validate :", defs)
    return defs
}

export const validateQuestion = (question) => {
    switch (question.typeId) {
        case QUESTION_TYPES_ID.MULTIPLE_CHOICE:
            return validateMultipleQuestion(question)
        case QUESTION_TYPES_ID.TF_CHOICE:
            return validateTFQuestion(question)     
        case QUESTION_TYPES_ID.PIC_WORD:
            return validatePicWordQuestion(question)
        case QUESTION_TYPES_ID.WORD_TABLE:
            return validateWordTableQuestion(question)   
        default: 
            return []
    }
}

export const validateGameSetting = (game) => {
    const {title} = game
    console.log("Check validate game:", title)
    // Check title is missing:
    if (title===null || title==='') {
        return false
    }

    return true

}

const reducer = (state, action) => {
    var {question, index, setting, type} = action.payload !==undefined ? action.payload : {}

    var questions = state.questions

    var temp
    switch (action.type) {
        case 'UPDATE_GAME_SETTING':
            console.log("Update game setting:", setting)
            return {
                ...state,
                ...setting
            }
        case 'VALIDATE_GAME':
            console.log("Validate game")

            console.log("IS validated: ", state.isValidated)
            return {
                ...state
            }
        case 'SELECT_QUESTION': 
            state.questionIndex = index
            return {
                ...state
            }
        
        case 'ADD_QUESTION':
            temp = cloneQuestion(QUESTION_TYPES[type].sample)
            temp.index = questions.length
            console.log("Add question:", questions, temp);
            questions.push(temp)
            return {
                ...state,
                questionIndex: questions.length - 1
            }
        case 'DUPLICATE_QUESTION':
            question = questions[index]
            temp = cloneQuestion(question)
            temp.index = questions.length
            console.log("Question cloned:", temp);
            questions = [...questions, temp]
            console.log("Questions :", questions.length, questions);
            return {
                ...state,
                questions
            }
        case 'UPDATE_QUESTION':
            state.questions[index] = question

            return {
                ...state
            }
        case 'DELETE_QUESTION':
            state.questions.forEach((item, i) => {
                if (i>=index) {
                    state.questions[i].index = i - 1
                }
            })
            state.questions.splice(index,1)
            if (index <= state.questionIndex) {
                state.questionIndex = Math.max(0, state.questionIndex - 1)
            }
            return {
                ...state
            }
    
        case 'START_CREATE_GAME': {
            console.log("Start create game with: ", QUESTION_TYPES_ID.MULTIPLE_CHOICE);
            return {
                ...JSON.parse(JSON.stringify(sample_game)),
                mode: 'create',
                questionIndex: 0
            }
        }

        case 'START_EDIT_GAME': {
            return {
                ...JSON.parse(JSON.stringify(action.payload.game)),
                mode: 'edit',
                questionIndex: 0
            }
        }
        default: 
            return state
    }
}

export default reducer