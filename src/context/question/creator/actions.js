
export const selectQuestion = (index) => ({
    type: 'SELECT_QUESTION',
    payload: {
        index
    }
})

export const initQuestions = (questions, isEditMode = false) => {
    console.log("Init question isEditMode:", isEditMode);
    return ({
        type: 'INIT_QUESTIONS',
        payload: {
            questions,
            isEditMode
        }
    })
}

export const updateDefectiveQuestions = (defectiveQuestions) => ({
    type: 'UPDATE_DEFECTIVE_QUESTIONS',
    payload: {
        defectiveQuestions
    }
})

export const showDefectiveQuestions = (showDefectives) => ({
    type: 'SHOW_DEFECTIVES_QUESTIONS',
    payload: {
        showDefectives
    }
})

export const addEmptyQuestion = (type) => ({
    type: 'ADD_EMPTY_QUESTION',
    payload: {
        type
    }
})

export const addQuestionFromBank = (question) => ({
    type: 'ADD_QUESTION_FROM_BANK',
    payload: {
        question
    }
})


export const duplicateQuestion = (index) => ({
    type: 'DUPLICATE_QUESTION',
    payload: {
        index
    }
})

export const updateQuestion = (question, index) => ({
    type: 'UPDATE_QUESTION',
    payload: {
        question,
        index
    }
})

export const deleteQuestion = (index) => ({
    type: 'DELETE_QUESTION',
    payload: {
        index
    }
})