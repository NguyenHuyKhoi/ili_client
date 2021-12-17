import { CheckCircleSharp } from '@mui/icons-material'
import { Alert, Button, Link, Snackbar, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState, useContext, useEffect } from 'react'
import { requestResetPassword } from '../../../context/auth/apiCalls'
import { AuthContext } from '../../../context/auth/context'
import { theme } from '../../../theme'
import { validateEmail } from '../../../util/validator'
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

const ForgotPasswordPage = () => {
    const classes = useStyles()
    const {dispatch, isSuccess, message, isLoading} = useContext(AuthContext)
    const [isSubmited, setIsSubmited] = useState(false)
    const [inputs, setInputs] = useState({email: ''})
    const [msg, setMsg] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    const handleMsg = (msg) => {
        setMsg(msg)
        setShowAlert(msg != '')
    }

    useEffect(() => {
        handleMsg(message)
        //console.log("Update message", message)
        return () => {
            
        }
    }, [message])

    const handleSubmit = (e) => {
        e.preventDefault() 

        if (!validateEmail(inputs.email)) {
            handleMsg("Email is empty or invalid")
            return
        }

        requestResetPassword({
            email: inputs.email
        },dispatch)

        setIsSubmited(true)
    }

    const handleChange = (key, value) => {
        handleMsg("")
        setInputs({
            ...inputs,
            [key]: value
        })
    }

    const {email} = inputs
    return (
        <div className = {classes.container}>
            {
                isSuccess ?
                <div className = {classes.checkEmail}>
                    <CheckCircleSharp sx = {{color: 'green', fontSize: 60}}/>
                    <Typography variant = 'h5' sx = {{fontWeight: 'bold', mt: theme.spacing(2)}}>
                        Check your email
                    </Typography>
                    <Typography variant = 'caption' sx = {{textAlign: 'center',mx: theme.spacing(3), my: theme.spacing(2)}}>
                        We've send you an email about resetting your password
                            if you signuped by this mail
                    </Typography>
                    <Button variant = 'contained' color = 'success'>
                        <Link href = '/auth/login' underline = 'none' sx = {{color: 'white'}}>
                                Back to login
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
                        Reset Password
                    </Typography>
                    <div className = {classes.form}>
                        <div className = {classes.inputs}>
                            <TextField id="outlined-basic" label="Email" placeholder = "Enter your email" variant="outlined"
                                   value = {email}
                                   onChange = {(e) => handleChange('email', e.target.value)}
                                 />
                            <Button variant = 'contained' sx = {{width: '100%', mt: theme.spacing(2)}}
                                onClick = {handleSubmit}
                                disabled = {isLoading}>
                                Send reset link
                            </Button>
                        </div>
                        <div className = {classes.footer}>
                            <Link href = '/auth/login'>
                                Back to login
                            </Link>
                        </div>
                    
                    </div>
                </>
            }
         

        </div>
    )
}

export default ForgotPasswordPage
