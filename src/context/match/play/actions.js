
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

export const updateLivestreamStage = (livestreamStage) => ({
    type: 'UPDATE_LIVESTREAM_STAGE',
    payload: {
        livestreamStage
    }
})

export const resetMatch = (match) => ({
    type: 'RESET_MATCH',
    payload: {
        match
    }
})
