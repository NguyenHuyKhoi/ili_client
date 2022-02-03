import { DEFECTIVE_CHECK_TYPES, QUESTION_TYPES, QUESTION_TYPES_ID, sample_game } from "./context"

export const validateMultipleQuestion = (question) => {
    console.log("Validate multi : ", question);
    let defs = []
    let {title, answers, correct_answer} = question
    // Check title is missing:
    if (title === "" || title == null) {
        defs.push('Title missing')
    } 
    // Check answers is missing
    let emptyAnswers = answers.filter((item) => (item == null) || (item === '')).length
    if (emptyAnswers > 0) {
        defs.push(emptyAnswers + ' answers missing')
    }

    const arr = [[0,1], [0,2], [0,3], [1,2], [1,3], [2,3]]

    let dupPairs = arr.filter((pair, index) => {
        var i1 = answers[pair[0]], i2 = answers[pair[1]]
        return (i1 != null && i2 != null && i1 == i2)
    }).length
    if (dupPairs > 0) {
        defs.push('Some answers are same.')
    }
    
    // Check correct answer is selected: 
    if (correct_answer == null) {
        defs.push('Correct answers not selected')
    }
    //console.log("Validate :", defs)
    return defs
}

export const validateTFQuestion = (question) => {
    let defs = []
    let {title, correct_answer} = question
    // Check title is missing:
    if (title === "" || title == null) {
        defs.push('Title missing')
    } 

    // Check correct answer is selected: 
    if (correct_answer == null) {
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
    if (title === "" || title == null) {
        defs.push('Title missing')
    } 

    // Check answers is missing
    let emptyImages = images.filter((item) => (item == null)).length
    if (emptyImages === 4) {
        defs.push('No hint image')
    }

    // Check correct answer is selected: 
    if (correct_answer == null || correct_answer === '') {
        defs.push('Correct answers not selected')
    }
    //console.log("Validate :", defs)
    return defs
}

export const validateWordTableQuestion = (question) => {
    let defs = []
    let {title, char_table, correct_answers} = question
    // Check title is missing:
    if (title==="" || title == null) {
        defs.push('Title missing')
    } 

    // Check answers is missing
    let emptyChars = char_table.filter((item) => (item == null)).length
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

const reducer = (state, action) => {
    var {question, index, type, defectiveQuestions, showDefectives, isEditMode} = action.payload != undefined ? action.payload : {}

    var payloadQuestions = action.payload != undefined ? action.payload.questions : []
    var questions = state.questions

    var temp
    switch (action.type) {
        case 'SELECT_QUESTION': 
            state.questionIndex = index
            return {
                ...state
            }
        case 'INIT_QUESTIONS': 
            console.log("Init questions:", payloadQuestions, isEditMode);
            state.questionIndex = 0
            return {
                ...state,
                isEditMode,
                questionIndex: 0,
                defectiveQuestions: [],
                showDefectives: DEFECTIVE_CHECK_TYPES.NOT_CHECK,
                questions: [...payloadQuestions],
            }
        case 'UPDATE_DEFECTIVE_QUESTIONS': 
            return {
                ...state,
                defectiveQuestions: [...defectiveQuestions],
            }
        case 'SHOW_DEFECTIVES_QUESTIONS':
            return {
                ...state,
                showDefectives
            }
        case 'ADD_EMPTY_QUESTION':
            temp = cloneQuestion(QUESTION_TYPES[type].sample)
            temp.index = questions.length
            questions = [...questions, temp]
            return {
                ...state,
                questions,
                questionIndex: questions.length - 1
            }
        case 'ADD_QUESTION_FROM_BANK':
            temp = cloneQuestion(question)
            temp.index = questions.length 
            questions = [...questions, temp]
            return {
                ...state,
                questions,
                questionIndex: questions.length - 1
            }
        case 'DUPLICATE_QUESTION':
            question = questions[index]
            temp = cloneQuestion(question)
            temp.index = questions.length
            questions = [...questions, temp]
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
        default: 
            return state
    }
}

export default reducer