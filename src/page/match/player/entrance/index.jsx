import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
        backgroundColor: 'purple'
    },
    logo: {
        width: 250,
        height: 120,
        marginBottom: theme.spacing(5)
    }
}))

const INPUT_STAGE = {
    ENTER_PIN: 0, 
    ENTER_NAME: 1
}

const MatchPlayerEntrancePage = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {match, dispatch} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    const [input, setInput] = useState('')
    const [stage, setStage] = useState(INPUT_STAGE.ENTER_PIN)
    const [alert, setAlert] = useState({})

    const {pinCode} = match ? match : {}
    useEffect(() => {
        socket.on('match:update', (match) => {
            dispatch(updateMatch(match))
        })
    }, [])  

    const handleSubmit = () => {
        switch (stage) {
            case INPUT_STAGE.ENTER_PIN: 
                socket.emit('match:join', input, (match) => {
                    if (match) {
                        dispatch(updateMatch(match))
                        setStage(INPUT_STAGE.ENTER_NAME)
                        setAlert({
                            type: 'success',
                            msg: 'Pincode is correct'
                        })
                        setInput('')
                    }
                    else {
                        setAlert({
                            type: 'error',
                            msg: 'Pincode is wrong'
                        })
                    }
                })
                break
            case INPUT_STAGE.ENTER_NAME: 
                socket.emit('match:updateUser', pinCode, { name: input}, (response) => {
                    if (response) {
                        navigate('/match/player/lobby', {replace: false})
                    }
                } )
                break
        }
    }
    return (
        <div className = {classes.container}>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kahoot_Logo.svg/1280px-Kahoot_Logo.svg.png' className = {classes.logo}/>
            <Form onSubmit = {handleSubmit} onChange = {(value) => setInput(value)} 
                showAlert = {alert.type == 'error'}
                value = {input}
                btnTitle = {
                    stage == INPUT_STAGE.ENTER_PIN?'Enter':
                        stage == INPUT_STAGE.ENTER_NAME?'Ok, go':
                            ''
                } 
                placeholder = {
                    stage == INPUT_STAGE.ENTER_PIN?'Game pin':
                    stage == INPUT_STAGE.ENTER_NAME?'Nickname':
                        ''
                }/>
            <Snackbar open={alert.type != undefined} autoHideDuration={5000} onClose={() => setAlert({})}

                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default MatchPlayerEntrancePage
