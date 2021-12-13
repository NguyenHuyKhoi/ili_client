// Get Samples
export const getSampleStart = () => ({
    type: 'GET_SAMPLE_START'
})

export const getSampleSuccess = (sample) => ({
    type: 'GET_SAMPLE_SUCCESS',
    payload: sample
})

export const getSampleFailure = () => ({
    type: 'GET_SAMPLE_FAILURE'
})
