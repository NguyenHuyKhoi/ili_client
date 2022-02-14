import { QUESTION_TYPES_ID } from "../../question/creator/context";
import { sample_game } from "./context";

export const validateGameSetting = (game) => {
    const {title} = game
    console.log("Check validate game:", title)
    // Check title is missing:
    if (title == null || title == '') {
        return false
    }

    return true

}

const reducer = (state, action) => {
    var {question, index, setting, type} = action.payload !==undefined ? action.payload : {}

    var questions = state.questions

    var temp
    switch (action.type) {
        case 'UPDATE_GAME_SETTING':
            console.log("Update game setting:", setting)
            return {
                ...state,
                ...setting
            }
        case 'START_CREATE_GAME': {
            console.log("Start create game with: ", QUESTION_TYPES_ID.MULTIPLE_CHOICE);
            return {
                ...JSON.parse(JSON.stringify(sample_game)),
                mode: 'create',
                questionIndex: 0
            }
        }

        case 'START_EDIT_GAME': {
            return {
                ...JSON.parse(JSON.stringify(action.payload.game)),
                mode: 'edit',
                questionIndex: 0
            }
        }
        default: 
            return state
    }
}

export default reducer