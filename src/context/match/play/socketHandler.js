const { io } = require("socket.io-client")
const { joinMatchSuccess, joinMatchFailure, updateMatch, updateNameSuccess, updateNameFailure, leaveMatchSuccess, leaveMatchFailure } = require("./actions")
const socket = io('http://localhost:8800')

export const joinMatch = (pinCode, dispatch) => {
    socket.emit('match:join', pinCode, (response) => {
        console.log("Match join response :", response)
        if (response) {
            dispatch(joinMatchSuccess(response))
        }
        else {
            dispatch(joinMatchFailure())
        }
    })
}

export const leaveMatch = (pinCode, dispatch) => {
    socket.emit('match:leave', pinCode, (response) => {
        if (response) {
            dispatch(leaveMatchSuccess())
        }
        else {
            dispatch(leaveMatchFailure())
        }
    })
}

export const updateNameOnMatch = (pinCode, name, dispatch) => {
    socket.emit('match:updateName',pinCode, name, (response) => {
        if (response) {
            dispatch(updateNameSuccess())
        }
        else {
            dispatch(updateNameFailure())
        }
    })
}

export const createMatch = (user, match, dispatch) => {
    socket.emit('match:create', user, match)
}

export const listenUpdateMatch = (pinCode, dispatch) => {
    if (pinCode == null || pinCode == undefined) return
    socket.emit('match:getLatest', pinCode, (match) => {
        console.log("Get latest match: ", match)
        dispatch(updateMatch(match))
    })
    socket.on('match:update', (match) => {
        dispatch(updateMatch(match))
    })
}

