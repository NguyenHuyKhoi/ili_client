import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
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
    const classes = useStyles()
    const [input, setInput] = useState('')
    const [stage, setStage] = useState(INPUT_STAGE.ENTER_PIN)
    const [showAlert, setShowAlert] = useState(false)

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false)
    }
    const handleChangeInput = (value) => {
        setInput(value)
        setShowAlert(false)
    }
    const handleSubmit = () => {
        switch (stage) {
            case INPUT_STAGE.ENTER_PIN: 
                if (input != '123456') {
                    setShowAlert(true)
                }
                else {
                    setStage(INPUT_STAGE.ENTER_NAME)
                    setInput('')
                }
            case INPUT_STAGE.ENTER_NAME: 
        }
    }
    return (
        <div className = {classes.container}>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kahoot_Logo.svg/1280px-Kahoot_Logo.svg.png' className = {classes.logo}/>
            <Form onSubmit = {handleSubmit} onChange = {handleChangeInput} showAlert = {showAlert}
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
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    We didn't recognize that game PIN. Please check and try again.
                </Alert>
            </Snackbar>
        </div>
    )
}

export default MatchPlayerEntrancePage
