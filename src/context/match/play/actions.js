export const generateError = (error) => ({
    type: 'GENERATE_ERROR',
    payload: {
        error
    }
})

export const loading = () => ({
    type: 'LOADING'
})

export const resetState = () => ({
    type: 'RESET_STATE'
})

export const createMatchSuccess = (match) => ({
    type: 'CREATE_MATCH_SUCCESS',
    payload: {
        match
    }
})

export const joinMatchSuccess = () => ({
    type: 'JOIN_MATCH_SUCCESS'
})

export const joinMatchFailure = () => ({
    type: 'JOIN_MATCH_FAILURE'
})