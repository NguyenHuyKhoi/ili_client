import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import background from '../../../../asset/image/background.jpg'
import logo from '../../../../asset/image/logo.png'
import { AuthContext } from '../../../../context/auth/context'
import { updateMatch } from '../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import Form from './component/Form'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${background})`,
    },
    logo: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2),
        height: theme.spacing(5),
        '&:hover': {
            cursor: 'pointer'
        }
    }
}))

const input_type = {
    enter_pin: {
        title: 'Enter pincode',
        desc: 'That is a 3-digit number.',
        placeholder: '...',
        btnLabel: 'Enter',
        type: 'number'
    },
    enter_name: {
        title: 'Enter nickname',
        desc: 'Can use your username',
        placeholder: '...',
        btnLabel: 'Join'
    }
}


const MatchPlayerEntrancePage = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {user} = useContext(AuthContext)
    const {match, dispatch} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    const [input, setInput] = useState({value: '', type: 'enter_pin'})
    const [alert, setAlert] = useState({})

    const {pinCode} = match ? match : {}
    const {value, type} = input
    useEffect(() => {
        socket.on('match:sync', (data) => {
            let {match} = data
            dispatch(updateMatch(match))
        })
    }, [])  

    const handleSubmit = () => {
        switch (type) {
            case 'enter_pin': 
                if (value ===  '') {
                    setAlert({
                        type: 'error',
                        msg: 'pinCode is empty'
                    })
                    return 
                }
                console.log("Client send request to join match:", socket.id)
                let player = user != null ?
                    {
                        userId: user._id, 
                        avatar: user.avatar
                    }
                    :
                    {
                        
                    }
                socket.emit('match:join', value, player, ((match) => {
                    if (match) {
                        dispatch(updateMatch(match))
                        setAlert({
                            type: 'success',
                            msg: 'pinCode is correct'
                        })
                        setInput({type: 'enter_name',value: user != null ? user.username : ''})
                    }
                    else {
                        setAlert({
                            type: 'error',
                            msg: 'pinCode is wrong or match is locked.'
                        })
                    }
                }))
                break
            case 'enter_name': 
                if (value ===  '') {
                    setAlert({
                        type: 'error',
                        msg: 'Username is empty'
                    })
                    return 
                }
                console.log("Enter name: ", value)
                socket.emit('match:updatePlayer', pinCode, { username: value}, (response) => {
                    if (response) {
                        return navigate('/match/player/lobby', {replace: true})
                    }
                } )
                break
            default: 
                break
        }
    }

    const handleGoHome = () => {
        return navigate('/', {replace: true})
    }
    return (
        <div className = {classes.container}>
            <img src = {logo} className = {classes.logo} alt = 'Logo'
                onClick ={handleGoHome}/>
            <Form 
                onSubmit = {handleSubmit} 
                onChange = {(value) => setInput({...input, value})} 
                showAlert = {alert.type ===  'error'}
                value = {value}
                input_type = {input_type[type]}/>
            <Snackbar open={alert.type !== undefined} autoHideDuration={5000} onClose={() => setAlert({})}

                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default MatchPlayerEntrancePage
