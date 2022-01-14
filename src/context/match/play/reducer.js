import { sample_match } from "./context"

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

            let newState = {
                ...state,
                match,
                question: question == {} ? state.question : question,
                answer_counts
            }   
            return newState
        }
        case 'UPDATE_LIVESTREAM_STAGE': {
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

        case 'RESET_MATCH': {
            return {
                ...state,
                match: JSON.parse(JSON.stringify(sample_match))
            }
        }
        default: 
            return state
    }
}

export default reducer