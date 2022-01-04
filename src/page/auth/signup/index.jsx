    import { Alert, Button, Checkbox, Divider, Link, Snackbar, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/auth/context'
import { theme } from '../../../theme'
import { validateEmail } from '../../../util/validator'
import { LinkedLoginButton } from '../component/LinkedLoginButton'
const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        backgroundColor: '#f2f2f2',
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
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    checkboxRegisterInfor: {
        display: 'flex',
        flexDirection: 'row'
    }
}))

const SignupPage = () => {
    const classes = useStyles()
    const {dispatch} = useContext(AuthContext)
    const [inputs, setInputs] = useState({email: "", password: ""})
    const [alert, setAlert] = useState({})
    const {email, password} = inputs

    const handleSignup = (e) => {
        e.preventDefault() 
        if (!validateEmail(email)) {
            setAlert({
                type: 'error',
                msg: 'Email is not invalid'
            })
            return
        }
        // if (!validatePassword(password)) {
        //     handleMsg("Password is empty or invalid")
        //     return
        // }

        axios.post('auth/signup', { email, password})
        .then ((res) => {
            setAlert({
                type: 'success',
                msg: 'Signup sucess'
            })
        })
        .catch((err) => {
            setAlert({
                type: 'error',
                msg: 'Sign up error'
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
                    {
                        alert.msg
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
                <TextField 
                    id="outlined-password-input"
                    label="Password" variant="outlined" 
                    type="password" 
                    value = {password}
                    onChange = {(e) => handleChange('password', e.target.value)}
                    sx = {{my: theme.spacing(2)}}/>
                <Button 
                    variant = 'contained' 
                    onClick = {handleSignup}
                    color = {email == '' && password == '' ? 'neutral' : 'success'}
                    disabled = {email == '' && password == ''}
                    sx = {{my: theme.spacing(3)}}>
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
                    <Typography variant = 'subtitle1' sx = {{alignSelf: 'center'}}>
                        or
                    </Typography>
                </div>
              

                <div className = {classes.linkRow} style = {{alignSelf: 'center'}}>
                    <Typography variant = ' ' >
                        Already have an account?
                    </Typography>
                    <Link href = '/auth/login' sx = {{ml: theme.spacing(1)}} >
                        Log in
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default SignupPage
