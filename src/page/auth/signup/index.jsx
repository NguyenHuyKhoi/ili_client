    import { Alert, Button, Checkbox, Divider, Link, Snackbar, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../../context/auth/apiCalls'
import { AuthContext } from '../../../context/auth/context'
import { theme } from '../../../theme'
import { validateEmail } from '../../../util/validator'
import { LinkedLoginButton } from '../component/LinkedLoginButton'
const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        width: 360,
        maxHeight: '80vh',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.3),
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3)
    },
    linkRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        display: 'flex',
        flexDirection: 'column',
    },
    btn: {
        marginBottom: theme.spacing(1)
    },
    btns: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    checkboxRegisterInfor: {
        display: 'flex',
        flexDirection: 'row'
    }
}))

const SignupPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {dispatch, message, isSuccess, isLoading} = useContext(AuthContext)
    const [inputs, setInputs] = useState({email: "", password: ""})
    const [msg, setMsg] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        handleMsg(message)
        return () => {
            
        }
    }, [message])

    const handleMsg = (msg) => {
        setMsg(msg)
        setShowAlert(msg != '')
    }
    const handleSignup = (e) => {
        e.preventDefault() 
        console.log("Is success", isSuccess)
        if (!validateEmail(inputs.email)) {
            handleMsg("Email is empty or invalid")
            return
        }
        // if (!validatePassword(inputs.password)) {
        //     handleMsg("Password is empty or invalid")
        //     return
        // }

        signup({
            email: inputs.email, 
            password: inputs.password
        }, dispatch)
    }
    const handleChange = (key, value) => {
        handleMsg("")
        setInputs({
            ...inputs,
            [key]: value
        })
    }
    const {email, password} = inputs
    return (
        <div className = {classes.container}>
            <Snackbar open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setShowAlert(false)} severity={isSuccess== "" ?"error": "success"} sx={{ width: '100%' }}>
                    {
                        msg
                    }
                </Alert>
            </Snackbar>
            <div className = {classes.form}>
                <Typography variant = 'h5' sx = {{alignSelf: 'center', fontWeight: 'bold'}}>
                    Create an account
                </Typography>
                <TextField id="outlined-basic" label="Email" variant="outlined" 
                    value = {email}
                    onChange = {(e) => handleChange('email', e.target.value)}
                    sx = {{mt: theme.spacing(2)}}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" 
                    value = {password}
                    onChange = {(e) => handleChange('password', e.target.value)}
                    sx = {{my: theme.spacing(2)}}/>
                <Button variant = 'contained' 
                    onClick = {handleSignup}
                    disabled = {isLoading}
                    color = 'success' sx = {{my: theme.spacing(3)}}>
                    <Link href = '/auth/login' underline = 'none' sx = {{color: 'white'}}>
                        Sign up
                    </Link>
                </Button>
                
                <div className = {classes.checkboxRegisterInfor}>
                    <Checkbox defaultChecked />
                    <Typography variant = 'caption'>
                    I wish to receive information, offers, recommendations, and updates from Kahoot!
                    </Typography>
                </div>

                <div className = {classes.divider}>
                    <Divider/>
                    <Typography variant = 'subtitle1' sx = {{alignSelf: 'center'}}>
                        or
                    </Typography>
                    <Divider/>
                </div>
                <div className = {classes.btns}>
                    <div className = {classes.btn}>
                        <LinkedLoginButton/>
                    </div>
                    <div className = {classes.btn}>
                        <LinkedLoginButton/>
                    </div>
                    <div className = {classes.btn}>
                        <LinkedLoginButton/>
                    </div>
                    <div className = {classes.btn}>
                        <LinkedLoginButton/>
                    </div>
                </div>
              

                <div className = {classes.linkRow} style = {{alignSelf: 'center'}}>
                    <Typography variant = 'caption' >
                        Already have an account?
                    </Typography>
                    <Link href = '/auth/login' >
                        Log in
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default SignupPage
