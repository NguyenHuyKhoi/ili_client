
export const getMatchesSuccess = (matches) => ({
    type: 'GET_MATCHES_SUCCESS',
    payload: {
        matches
    }
})

export const selectMatch = (match) => ({
    type: 'SELECT_MATCH',
    payload: {
        match
    }
})

