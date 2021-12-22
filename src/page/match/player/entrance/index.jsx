import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetState } from '../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { joinMatch } from '../../../../context/match/play/socketHandler'
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
    const {isSuccess, isLoading, message} = useContext(MatchPlayContext)
    const [input, setInput] = useState('')
    const [stage, setStage] = useState(INPUT_STAGE.ENTER_PIN)
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        setShowAlert(message != '')
        return () => {
            
        }
    }, [message])

    const {dispatch} = useContext(MatchPlayContext)

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(resetState())
    }
    const handleChangeInput = (value) => {
        setInput(value)
        setShowAlert(false)
    }
    const handleSubmit = () => {
        switch (stage) {
            case INPUT_STAGE.ENTER_PIN: 
                joinMatch(input, dispatch)
                setStage(INPUT_STAGE.ENTER_NAME)
                setInput('')
            case INPUT_STAGE.ENTER_NAME: 
                naviga
        }
    }
    return (
        <div className = {classes.container}>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kahoot_Logo.svg/1280px-Kahoot_Logo.svg.png' className = {classes.logo}/>
            <Form onSubmit = {handleSubmit} onChange = {handleChangeInput} showAlert = {showAlert && !isSuccess}
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
            <Snackbar open={showAlert} autoHideDuration={5000} onClose={handleCloseAlert}

                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={handleCloseAlert} severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default MatchPlayerEntrancePage
