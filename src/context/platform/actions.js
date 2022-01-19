
export const selectPlatform = (account) => ({
    type: 'SELECT_PLATFORM',
    payload: {
        account
    }
})

export const selectSocial = (social) => ({
    type: 'SELECT_SOCIAL',
    payload: {
        social
    }
})
