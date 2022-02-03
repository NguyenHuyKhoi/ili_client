
export const selectQuestion = (index) => ({
    type: 'SELECT_QUESTION',
    payload: {
        index
    }
})

export const initQuestions = (questions) => ({
    type: 'INIT_QUESTIONS',
    payload: {
        questions
    }
})

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

export const addQuestion = (type) => ({
    type: 'ADD_QUESTION',
    payload: {
        type
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