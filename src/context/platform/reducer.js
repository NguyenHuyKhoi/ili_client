const reducer = (state, action) => {
    const { account} = action.payload != undefined ? action.payload : {}

    var temps, temp
    switch (action.type) {
        case 'ACTIVE_PLATFORM':
            temps = JSON.parse(JSON.stringify(state.platforms))
            temps[account.id] = account

            return {
                ...state, 
                platforms: temps
            }
        case 'SELECT_PLATFORM':
            temp = JSON.parse(JSON.stringify(account))
            return {
                ...state,
                platform: temp
            }
        default: 
            return state
    }
}

export default reducer