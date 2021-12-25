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


const MatchPlayerEntrancePage = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {match, dispatch} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    const [input, setInput] = useState({value: '', type: 'enter_pin'})
    const [alert, setAlert] = useState({})

    const {pinCode} = match ? match : {}
    const {value, type} = input
    useEffect(() => {
        socket.on('match:sync', (match) => {
            dispatch(updateMatch(match))
        })
    }, [])  

    const handleSubmit = () => {
        switch (type) {
            case 'enter_pin': 
                socket.emit('match:join', '111', (match) => {
                    if (match) {
                        dispatch(updateMatch(match))
                        setAlert({
                            type: 'success',
                            msg: 'Pincode is correct'
                        })
                        setInput({type: 'enter_name',value: ''})
                    }
                    else {
                        setAlert({
                            type: 'error',
                            msg: 'Pincode is wrong'
                        })
                    }
                })
                break
            case 'enter_name': 
                socket.emit('match:updateUser', pinCode, { name: value}, (response) => {
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
            <Form onSubmit = {handleSubmit} onChange = {(value) => setInput({...input, value})} 
                showAlert = {alert.type == 'error'}
                value = {value}
                btnTitle = {
                    type == 'enter_pin'?'Enter':
                    type == 'enter_name'?'Ok, go':
                            ''
                } 
                placeholder = {
                    type == 'enter_pin'?'Game pin':
                    type == 'enter_name'?'Nickname':
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
