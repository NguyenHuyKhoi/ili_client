
export const getQuestionsSuccess = (questions) => ({
    type: 'GET_QUESTIONS_SUCCESS',
    payload: {
        questions
    }
})

export const selectQuestion = (question) => ({
    type: 'SELECT_QUESTION',
    payload: {
        question
    }
})

