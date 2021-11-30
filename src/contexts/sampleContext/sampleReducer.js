const sampleReducer = (state, action) => {
    switch (action.type) {
        // GET SAMPLE 
        case 'GET_SAMPLE_START':
            return {
                sample: null,
                isFetching: true,
                error: false
            }
        case 'GET_SAMPLE_SUCCESS':
            return {
                sample: {},
                isFetching: false,
                error: false
            }
        case 'GET_SAMPLE_FAILURE':
            return {
                sample: [],
                isFetching: false,
                error: true
            }

        default: 
            return state
    }
}

export default sampleReducer