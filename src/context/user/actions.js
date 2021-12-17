export const generateError = (error) => ({
    type: 'GENERATE_ERROR',
    payload: {
        error
    }
})

export const loading = () => ({
    type: 'LOADING'
})

export const profileEditSuccess = (user) => ({
    type: 'PROFILE_EDIT_SUCCESS',
    payload: {
        user
    }
})


