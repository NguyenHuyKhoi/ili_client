import { CheckCircleSharp } from '@mui/icons-material'
import { Alert, Button, Link, Snackbar, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { resetPassword } from '../../../context/auth/apiCalls'
import { AuthContext } from '../../../context/auth/context'
import { theme } from '../../../theme'
import { validatePassword } from '../../../util/validator'
const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    form: {
        width: '25%',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        display: 'flex',
        flexDirection: 'column'
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        borderBottom: '1px solid gray'
    },
    footer: {
        padding: theme.spacing(2),
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
    },
    checkEmail: {
        display: 'flex',
        width: '25%',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(0.5),
        alignItems: 'center'
    }
}))

const ResetPasswordPage = (props) => {
    const classes = useStyles()
    const location = useLocation()
    const {dispatch, isSuccess, message, isLoading} = useContext(AuthContext)
    const [isSubmited, setIsSubmited] = useState(false)
    const [inputs, setInputs] = useState({password: '', repeatPassword: ''})
    const [msg, setMsg] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    const handleMsg = (msg) => {
        setMsg(msg)
        setShowAlert(msg != "")
    } 

    useEffect(() => {
        handleMsg(message)
        return () => {
            
        }
    }, [message])

    const handleSubmit = (e) => {
        e.preventDefault() 
        const {password, repeatPassword} = inputs

        // if (!validatePassword(password)) {
        //     handleMsg("Password is empty or invalid")
        //     return
        // }
        if (password == '' || repeatPassword == '') {
            handleMsg("Please fill all fields")
            return
        }

        if (password != repeatPassword) {
            handleMsg("Password is not same repeat one")
            return
        }
        const token = new URLSearchParams(location.search).get('token');
        console.log("Token")
        resetPassword({
            password: inputs.password
        },token ,dispatch)
    }

    const handleChange = (key, value) => {
        handleMsg("")
        setInputs({
            ...inputs,
            [key]: value
        })
    }

    const {password, repeatPassword} = inputs

    return (
        <div className = {classes.container}>
            {
                isSuccess ?
                <div className = {classes.checkEmail}>
                    <CheckCircleSharp sx = {{color: 'green', fontSize: 60}}/>
                    <Typography variant = 'h5' sx = {{fontWeight: 'bold', mt: theme.spacing(2)}}>
                        Success
                    </Typography>
                    <Typography variant = 'caption' sx = {{textAlign: 'center',mx: theme.spacing(3), my: theme.spacing(2)}}>
                        Your password has been changed
                    </Typography>
                    <Button variant = 'contained' color = 'success'>
                        <Link href = '/auth/login' underline = 'none' sx = {{color: 'white'}}>
                                Login
                        </Link>
                    </Button>
                </div>
                :
                <>
                    <Snackbar open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}
                        anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                        <Alert onClose={() => setShowAlert(false)} severity={"error"} sx={{ width: '100%' }}>
                            {
                                msg
                            }
                        </Alert>
                    </Snackbar>
                   <Typography variant = 'h6' sx = {{alignSelf: 'center', mb: theme.spacing(3)}}>
                        Reset Your Password
                    </Typography>
                    <div className = {classes.form}>
                        <div className = {classes.inputs}>
                            <TextField id="outlined-basic" label="Enter new password" placeholder = "Enter your email" variant="outlined" 
                                value = {password}
                                onChange = {(e) => handleChange('password', e.target.value)}/>
                            <TextField id="outlined-basic" label="Repeat new password" 
                                placeholder = "Enter your email" variant="outlined"
                                value = {repeatPassword}
                                onChange = {(e) => handleChange('repeatPassword', e.target.value)} 
                                sx = {{mt: theme.spacing(2)}}/>
                            <Button variant = 'contained' sx = {{width: '100%', mt: theme.spacing(2)}}
                                onClick = {handleSubmit} 
                                disabled = {isLoading}>
                                Reset password
                            </Button>
                        </div>
                    </div>
                </>
            }
         

        </div>
    )
}

export default ResetPasswordPage
