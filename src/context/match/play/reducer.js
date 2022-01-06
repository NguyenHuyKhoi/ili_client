
const reducer = (state, action) => {
    const {match,livestreamStage, question} = action.payload != undefined ? action.payload : {}
    switch (action.type) {

        case 'UPDATE_MATCH': {
            let question = {}
            let answer_counts = [0,0,0,0]
            const {progress} = match
            if (progress != undefined && progress.length >=1 ) {
                // update current question: 
                let current = progress[progress.length - 1]
                question = current.question
                
                current.answers.forEach((answer, index) => {
                    answer_counts[answer.answerIndex] ++ 
                })
                

            }
            return {
                ...state,
                match: {...match},
                question: question == {} ? state.question : question,
                answer_counts
            }
        }
        case 'UPDATE_LIVESTREAM_STAGE': {
            console.log("Update livestreamStage", livestreamStage)
            return {
                ...state,
                livestreamStage
            }
        }

        case 'VIEW_QUESTION': {
            return {
                ...state,
                question
            }
        }
        default: 
            return state
    }
}

export default reducer