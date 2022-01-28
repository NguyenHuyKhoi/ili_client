import { QUESTION_TYPES_ID } from '../../game/creator/context'
import { sample_match } from "./context"
const extractAnswerCount = (stage) => {
    try {
        var {question, answers} = stage
        var {correct_answer, typeId} = question 
        console.log("Correct answer :", correct_answer);
        var arr = []
        switch (typeId) {
            case QUESTION_TYPES_ID.MULTIPLE_CHOICE: 
                arr = [{ value: 'A', count: 0}, { value: 'B', count: 0},{ value: 'C', count: 0},{ value: 'D', count: 0}]
                answers.forEach((answer) => {
                    var idx = parseInt(answer.answerContent)
                    arr[idx].count = arr[idx].count + 1
                })
                return arr

            case QUESTION_TYPES_ID.TF_CHOICE: 
                arr = [{ value: 'True', count: 0}, { value: 'False', count: 0}]
                answers.forEach((answer) => {
                    var idx = parseInt(answer.answerContent)
                    arr[idx].count = arr[idx].count + 1
                })
                return arr

            case QUESTION_TYPES_ID.PIC_WORD: 
                answers.forEach((answer) => {
                    var content = answer.answerContent
                    var idx = arr.findIndex((item) => item.value ===content)
                    if (idx ===-1) {
                        arr.push({
                            value: content,
                            count : 1
                        })
                        console.log("Push new answer to arr:", content);
                    }
                    else {
                        arr[idx].count = arr[idx].count + 1
                        console.log("Push existed answer to arr:", content, arr[idx].count );
                    }
                })
                arr.sort((a,b) => {
                    if (a.value === correct_answer) return -1
                    if (b.value === correct_answer) return 1
                    if (a.count >= b.count) return -1
                    return 1
                })
                console.log("Count answers:", arr);
                var mostAnswers =  arr.slice(0, Math.min(arr.length, 4));
                console.log("4 most answers:", mostAnswers);
                return mostAnswers
            
            default: 
                return []
        }


    }

    catch (err) {
        console.log("Err extract count:", err);
        return []
    }
}
const reducer = (state, action) => {
    const {match,livestreamStage, question} = action.payload !==undefined ? action.payload : {}
    switch (action.type) {

        case 'UPDATE_MATCH': {
            let question = {}
            let answer_counts = []
            const {progress} = match
            if (progress !==undefined && progress.length >=1 ) {
                // update current question: 
                let current = progress[progress.length - 1]
                question = current.question
                
                // current.answers.forEach((answer, index) => {
                //     answer_counts[answer.answerIndex] ++ 
                // })
                answer_counts = extractAnswerCount(current)
            }

            let newState = {
                ...state,
                match,
                question: question ==={} ? state.question : question,
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