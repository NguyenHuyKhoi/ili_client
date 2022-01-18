export const activePlatform = (account) => ({
    type: 'ACTIVE_PLATFORM',
    payload: {
        account
    }
})

export const selectPlatform = (account) => ({
    type: 'SELECT_PLATFORM',
    payload: {
        account
    }
})