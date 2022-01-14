import { CheckCircleSharp } from '@mui/icons-material'
import { Alert, Link, Snackbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { theme } from '../../../theme'
import Button from '../../../component/Button'
import TextField from '../../../component/TextField'

import background from '../../../asset/image/background.jpg'
import GoHomeBtn from '../../../component/GoHomeBtn'
const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        backgroundImage: `url(${background})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    form: {
        width: 500,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: theme.spacing(0.5),
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
        border: 'solid 2px #000000',
        borderRadius: '255px 10px 225px 10px/10px 225px 10px 255px',
    }
}))


const ResetPasswordPage = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()
    const [inputs, setInputs] = useState({password: '', repeatPassword: ''})
    const [alert, setAlert] = useState({})
    const {repeatPassword, password} = inputs

    const handleSubmit = (e) => {
        e.preventDefault() 

        // if (!validatePassword(password)) {
        //     handleMsg("Password is empty or invalid")
        //     return
        // }
        if (password == '' || repeatPassword == '') {
            setAlert({
                type: 'error',
                msg:"Please fill all fields"
            })
            return
        }

        if (password != repeatPassword) {
            setAlert({
                type: 'error',
                msg:"Password is not same repeat one"
            })
            return
        }

        const token = new URLSearchParams(location.search).get('token');
        axios.post('auth/reset-password', {token, password})
        .then(() => {
            setAlert({
                type: 'success'
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

    const handleGoLogin = () => {
        return navigate('/login', {replace: true})
    }
    return (
        <div className = {classes.container}>
            <GoHomeBtn/>
            {
                alert.type == undefined ?
                <div className = {classes.form}>
                    <Typography variant = 'header' sx = {{fontWeight: 'bold', mt: theme.spacing(2), alignSelf: 'center'}}>
                        Success
                    </Typography>
                    <Typography variant = 'label' sx = {{textAlign: 'center',mt: theme.spacing(1)}}>
                        Your password has been changed
                    </Typography>
                    <Button 
                        label = 'Back to login'
                        variant = 'success'
                        style = {{marginTop: theme.spacing(5)}}
                        onClick = {handleGoLogin}
                    />
                </div>
                :
                <>
                    <Snackbar open={alert.type != undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                        anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                        <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                            {
                                alert.msg
                            }
                        </Alert>
                    </Snackbar>
                  
                    <div className = {classes.form}>
                        <Typography variant = 'header' sx = {{alignSelf: 'center'}}>
                            Reset Your Password
                        </Typography>
                        <TextField 
                            placeholder = 'Enter new password...'
                            value = {password}
                            onChange = {(value) => handleChange('password', value)}
                            style = {{marginTop: theme.spacing(3)}}
                            />


                        <TextField 
                            placeholder = 'Repeat new password...'
                            value = {repeatPassword}
                            onChange = {(value) => handleChange('repeatPassword', value)}
                            style = {{marginTop: theme.spacing(3)}}
                            />
                        <Button 
                            disabled = {password == '' || repeatPassword == ''}
                            variant =  {password == '' || repeatPassword == '' ? 'warning' : 'primary'}
                            label = 'Reset password'
                            style = {{marginTop: theme.spacing(5)}}
                            onClick = {handleSubmit}/>
                    </div>
                </>
            }
         

        </div>
    )
}

export default ResetPasswordPage
