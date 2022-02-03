
const reducer = (state, action) => {
    const {questions, question} = action.payload !== undefined ? action.payload : {}
    switch (action.type) {
        case 'GET_QUESTIONS_SUCCESS': 
            return {
                ...state,
                questions,
                question: questions.length > 0? questions[0] : null
            }
        case 'SELECT_QUESTION': 
            return {
                ...state,
                question: JSON.parse(JSON.stringify(question))
            }
        default: 
            return state
    }
}

export default reducer