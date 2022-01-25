const reducer = (state, action) => {
    const { account, social} = action.payload !== undefined ? action.payload : {}

    var temp
    switch (action.type) {
        case 'SELECT_PLATFORM':
            temp = JSON.parse(JSON.stringify(account))
            return {
                ...state,
                platform: temp,
                social: null
            }
        case 'SELECT_SOCIAL':
            temp = JSON.parse(JSON.stringify(social))
            console.log("Select social reducer:", social);
            return {
                ...state,
                social: temp
            }
        default: 
            return state
    }
}

export default reducer