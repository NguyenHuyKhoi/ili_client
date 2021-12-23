
import { Alert, Button, Divider, Link, Snackbar, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { loginSuccess } from '../../../context/auth/actions'
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
    forgotPassword: {
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
    }
}))
export const LoginWithButton = () => {
    const classes = useStyles()
    return (
        <div className = {classes.loginWithBtn}>
            <img className = {classes.logoWithBtnImg}
                src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'/>
            <Typography variant = 'subtitle1'>
                Continue with Google
            </Typography>
        </div>
    )
}

const LoginPage = () => {
    const classes = useStyles()
    const {dispatch} = useContext(AuthContext)
    const [inputs, setInputs] = useState({email: "", password: ""})
    const [alert, setAlert] = useState({})
    const {email, password} = inputs

    const handleLogin = (e) => {
        e.preventDefault() 

        if (!validateEmail(email)) {
            setAlert({
                type: 'error',
                msg: 'Email is empty or invalid'
            })
            return
        }
        // if (!validatePassword(password)) {
        //     handleMsg("Password is empty or invalid")
        //     return
        // }

        axios.post('auth/login', { email, password})
            .then ((res) => {
                let user = res.data
                dispatch(loginSuccess(user))
                setAlert({
                    type: 'success',
                    msg: 'Login sucess'
                })
            })
            .catch((err) => {
                let error = err.response.data
                console.log("Error :", error)
                setAlert({
                    type: 'error',
                    msg: 'Login Error'
                })
            })
    }

    const handleChange = (key, value) => {
        setAlert({})
        setInputs({
            ...inputs,
            [key]: value
        })
    }
    
    return (
        <div className = {classes.container}>
            <Snackbar open={alert.type != undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>
            <div className = {classes.form}>
                <Typography variant = 'h5' sx = {{alignSelf: 'center', fontWeight: 'bold'}}>
                    Login
                </Typography>
                <TextField id="outlined-basic" label="Username or email" variant="outlined" 
                    value = {email}
                    onChange = {(e) => handleChange('email', e.target.value)}
                    sx = {{mt: theme.spacing(2)}}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" 
                      value = {password}
                      onChange = {(e) => handleChange('password', e.target.value)}
                    sx = {{my: theme.spacing(2)}}/>
                <div className = {classes.forgotPassword}>
                    <Typography variant = 'caption' >
                        Forgot password?
                    </Typography>
                    <Link href = '/auth/forgot-password' >
                        Reset your password
                    </Link>
                </div>
                <Button variant = 'contained' color = 'success' sx = {{my: theme.spacing(3)}}
                    onClick = {handleLogin}>
                    Login
                </Button>
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
                        Don't have an account?
                    </Typography>
                    <Link href = '/auth/signup' >
                        Sign up
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default LoginPage
