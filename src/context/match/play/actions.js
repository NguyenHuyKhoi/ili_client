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

export const joinMatchSuccess = (match) => ({
    type: 'JOIN_MATCH_SUCCESS',
    payload: {
        match
    }
})

export const joinMatchFailure = () => ({
    type: 'JOIN_MATCH_FAILURE'
})

export const updateNameSuccess = () => ({
    type: 'UPDATE_NAME_SUCCESS'
})

export const updateNameFailure = () => ({
    type: 'UPDATE_NAME_FAILURE'
})

export const leaveMatchSuccess = () => ({
    type: 'LEAVE_MATCH_SUCCESS'
})

export const leaveMatchFailure = () => ({
    type: 'LEAVE_MATCH_FAILURE'
})

export const updateMatch = (match) => ({
    type: 'UPDATE_MATCH',
    payload: {
        match
    }
})