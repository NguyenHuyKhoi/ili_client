import { createContext } from "react"
const { io } = require("socket.io-client")


export const SocketContext = createContext()

export const SocketContextProvider = ({children}) => {
    const socket = io("https://ili-api.herokuapp.com")
    socket.on("connect", () => {
        console.log("Connected to server")
    });
  
    socket.on("disconnect", () => {
    });
    return <SocketContext.Provider
        value = {{
            socket: socket
        }}>
        {
            children
        }
    </SocketContext.Provider>
}