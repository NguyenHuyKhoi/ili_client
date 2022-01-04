
export const updateMatch = (match) => ({
    type: 'UPDATE_MATCH',
    payload: {
        match
    }
})

export const viewQuestion = (question) => ({
    type: 'VIEW_QUESTION',
    payload: {
        question
    }
})