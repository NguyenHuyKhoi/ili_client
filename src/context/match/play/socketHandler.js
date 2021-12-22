const { io } = require("socket.io-client")
const { joinMatchSuccess, joinMatchFailure } = require("./actions")
const socket = io('http://localhost:8800')

export const joinMatch = (pinCode, dispatch) => {
    console.log("Join match with pinCode: ", pinCode)
    socket.emit('match:join', pinCode, (response) => {
        if (response.isSuccess) {
            console.log("Join game success")
            dispatch(joinMatchSuccess())
        }
        else {
            console.log("Join game failure")
            dispatch(joinMatchFailure())
        }
    })
}