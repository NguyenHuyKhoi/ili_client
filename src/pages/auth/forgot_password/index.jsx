import { Add, CheckCircleSharp } from '@mui/icons-material'
import { Button, Divider, Link, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useState} from 'react'
import {theme} from '../../../theme'
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

const ForgotPassword = () => {
    const classes = useStyles()
    const [isSubmited, setIsSubmited] = useState(false)
    const handleSubmit = () => {
        setIsSubmited(true)
    }
    return (
        <div className = {classes.container}>
            {
                isSubmited ?
                <div className = {classes.checkEmail}>
                    <CheckCircleSharp sx = {{color: 'green', fontSize: 60}}/>
                    <Typography variant = 'h5' sx = {{fontWeight: 'bold', mt: theme.spacing(2)}}>
                        Check your email
                    </Typography>
                    <Typography variant = 'caption' sx = {{textAlign: 'center',mx: theme.spacing(3), my: theme.spacing(2)}}>
                        We've send you an email about resetting your password
                    </Typography>
                    <Button variant = 'contained' color = 'success'>
                        <Link href = '/auth/login' underline = 'none' sx = {{color: 'white'}}>
                                Back to login
                        </Link>
                    </Button>
                </div>
                :
                <>
                   <Typography variant = 'h6' sx = {{alignSelf: 'center', mb: theme.spacing(3)}}>
                        Reset Password
                    </Typography>
                    <div className = {classes.form}>
                        <div className = {classes.inputs}>
                            <TextField id="outlined-basic" label="Email" placeholder = "Enter your email" variant="outlined" />
                            <Button variant = 'contained' sx = {{width: '100%', mt: theme.spacing(2)}}
                                onClick = {handleSubmit}>
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

export default ForgotPassword
