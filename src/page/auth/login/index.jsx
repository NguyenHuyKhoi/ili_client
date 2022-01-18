
import { Alert, Snackbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import background from '../../../asset/image/background.jpg'
import Button from '../../../component/Button'
import GoHomeBtn from '../../../component/GoHomeBtn'
import Link from '../../../component/Link'
import TextField from '../../../component/TextField'
import { loginSuccess } from '../../../context/auth/actions'
import { AuthContext } from '../../../context/auth/context'
import { theme } from '../../../theme'
import { validateEmail } from '../../../util/validator'
const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        backgroundImage: `url(${background})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: 500,
        maxHeight: '80vh',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: theme.spacing(0.3),
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
        border: 'solid 2px #000000',
        borderRadius: '255px 10px 225px 10px/10px 225px 10px 255px',
    },
    forgotPassword: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: theme.spacing(2)
    },
    divider: {
        display: 'flex',
        flexDirection: 'column',
    },
    linkRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing(1)
    },
    btn: {
        marginBottom: theme.spacing(1)
    },
    btns: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(3)
    }
}))

const LoginPage = () => {
    const navigate = useNavigate()
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
            <GoHomeBtn/>
            <div className = {classes.form}>
                <Typography variant = 'header' sx = {{alignSelf: 'center', fontWeight: 'bold'}}>
                    Login
                </Typography>
                <TextField 
                    placeholder = 'Enter email...'
                    value = {email}
                    onChange = {(value) => handleChange('email', value)}
                    style = {{marginTop: theme.spacing(3)}}
                    />

                <TextField 
                    placeholder = 'Enter password...'
                    type="password"  
                    value = {password}
                    onChange = {(value) => handleChange('password', value)}
                    style = {{marginTop: theme.spacing(2)}}
                    />

                <Button 
                    disabled = {email == '' || password == ''}
                    variant =  {email == '' || password == '' ? 'warning' : 'primary'}
                    label = 'Login'
                    style = {{marginTop: theme.spacing(5)}}
                    onClick = {handleLogin}/>
              

                <div className = {classes.linkRow}>
                    <Link label = 'Signup' link = '/signup'
                            style = {{marginLeft: theme.spacing(1)}}/>
                    <Link label = 'Reset password' link = '/forgot-password'
                            style = {{ marginRight: theme.spacing(1)}}/>
                </div>

            </div>
        </div>
    )
}

export default LoginPage
