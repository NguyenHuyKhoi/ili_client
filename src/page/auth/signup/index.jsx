import { Alert, Snackbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useState } from 'react'
import background from '../../../asset/image/background.jpg'
import Button from '../../../component/Button'
import GoHomeBtn from '../../../component/GoHomeBtn'
import Link from '../../../component/Link'
import LoadingModal from '../../../component/LoadingModal'
import TextField from '../../../component/TextField'
import { theme } from '../../../theme'
import { validateEmail, validatePassword } from '../../../util/validator'

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        backgroundImage: `url(${background})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        width: 500,
        maxHeight: '80vh',
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
        border: 'solid 2px #000000',
        borderRadius: '255px 10px 225px 10px/10px 225px 10px 255px',
    },
    linkRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing(1)
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
    }
}))

const SignupPage = () => {
    const classes = useStyles()
    const [inputs, setInputs] = useState({email: "", password: ""})
    const [alert, setAlert] = useState({})
    const [modal, setModal] = useState({})
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
        if (!validatePassword(password)) {
            setAlert({
                type: 'error',
                msg: 'Password is empty or invalid'
            })
            return
        }

        setModal({state: 'loading'})

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
        .finally(() => {
            setModal({})
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
            <LoadingModal 
				open = {modal.state == 'loading'}/>
            <Snackbar open={alert.type !== undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {
                        alert.msg
                    }
                </Alert>
            </Snackbar>
            <GoHomeBtn/>
            <div className = {classes.form}>
                <Typography variant = 'header' sx = {{alignSelf: 'center', fontWeight: 'bold'}}>
                    Join with us
                </Typography>

                <TextField 
                    placeholder = 'Enter email...'
                    value = {email}
                    onChange = {(value) => handleChange('email', value)}
                    style = {{marginTop: theme.spacing(3), textAlign: 'center'}}
                    />

                <TextField 
                    placeholder = 'Enter password...'
                    type="password"  
                    value = {password}
                    onChange = {(value) => handleChange('password', value)}
                    style = {{marginTop: theme.spacing(2), textAlign: 'center'}}
                    />

                <Button 
                    disabled = {email ==='' || password ===''}
                    variant =  {email ==='' || password ==='' ? 'warning' : 'primary'}
                    label = 'Sign up'
                    style = {{marginTop: theme.spacing(5)}}
                    onClick = {handleSignup}/>

                <div className = {classes.linkRow}>
                    <Link label = 'Login' link = '/login'
                            style = {{marginLeft: theme.spacing(1)}}/>
                    <Link label = 'Reset password' link = '/forgot-password'
                            style = {{ marginRight: theme.spacing(1)}}/>
                </div>

            </div>
        </div>
    )
}

export default SignupPage
