import { CheckCircleSharp } from '@mui/icons-material'
import { Alert, Snackbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useState } from 'react'
import { theme } from '../../../theme'
import { validateEmail } from '../../../util/validator'
import background from '../../../asset/image/background.jpg'
import Button from '../../../component/Button'
import TextField from '../../../component/TextField'
import { useNavigate } from 'react-router-dom'
import Link from '../../../component/Link'
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
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3)
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
    const navigate = useNavigate()
    const classes = useStyles()
    const [inputs, setInputs] = useState({email: ''})
    const [alert, setAlert] = useState({})
    const {email} = inputs

    const handleSubmit = (e) => {
        console.log("Handle submit")
        e.preventDefault() 

        if (!validateEmail(email)) {
            setAlert({
                type: 'error',
                msg: 'Email is empty or invalid'
            })
            return
        }

        axios.post('auth/forgot-password', {email})
            .then (() => {
                setAlert({
                    type: 'success'
                })
            })
            .catch((err) => {
                console.log("Err:", err)
                setAlert({
                    type: 'error',
                    msg: err.response.data.error
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
                alert.type == 'success' ?
                <div className = {classes.form}>
                    <Typography variant = 'header' sx = {{fontWeight: 'bold', mt: theme.spacing(2), alignSelf: 'center'}}>
                        Check your email
                    </Typography>
                    <Typography variant = 'label' sx = {{textAlign: 'center',mx: theme.spacing(3), my: theme.spacing(2)}}>
                        It contain a link that can help you !
                    </Typography>
                    <Button 
                        variant = 'success' 
                        onClick = {handleGoLogin}
                        label = 'Back to login'
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
                        <Typography variant = 'header' sx = {{alignSelf: 'center',fontWeight: 'bold'}}>
                            Reset Password
                        </Typography>
                        <TextField 
                            placeholder = 'Enter email...'
                            value = {email}
                            onChange = {(value) => handleChange('email', value)}
                            style = {{marginTop: theme.spacing(3)}}
                            />

                        <Button
                            disabled = {email == ''}
                            variant =  {email == ''? 'warning' : 'primary'}
                            label = 'Send reset link'
                            style = {{marginTop: theme.spacing(5)}}
                            onClick = {handleSubmit}/>
                        
                        <Link label = 'Login' link = '/login'
                            style = {{alignSelf: 'center', marginTop: theme.spacing(1)}}/>
                    
                    </div>
                </>
            }
         

        </div>
    )
}

export default ForgotPasswordPage
