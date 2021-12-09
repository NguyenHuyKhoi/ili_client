import { Add } from '@mui/icons-material'
import { Button, Checkbox, Divider, Link, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import {theme} from '../../../theme'
import { LoginWithButton } from '../login'
const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    login: {
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
    loginWithBtn: {
        display: 'flex',
        border: '1px solid gray',
        borderRadius: theme.spacing(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: theme.spacing(1)
    },
    logoWithBtnImg: {
        width: 20,
        height: 20,
        position: 'absolute',
        left: theme.spacing(2),
        top: 0,
        bottom:0,
        margin: 'auto'
    },
    btnContainer: {
        marginBottom: theme.spacing(1)
    },
    btnsContainer: {
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

const Register = () => {
    const classes = useStyles()

    return (
        <div className = {classes.container}>
            <div className = {classes.login}>
                <Typography variant = 'h5' sx = {{alignSelf: 'center', fontWeight: 'bold'}}>
                    Create an account
                </Typography>
                <TextField id="outlined-basic" label="Email" variant="outlined" 
                    sx = {{mt: theme.spacing(2)}}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" 
                    sx = {{my: theme.spacing(2)}}/>
                <Button variant = 'contained' color = 'success' sx = {{my: theme.spacing(3)}}>
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
                <div className = {classes.btnsContainer}>
                    <div className = {classes.btnContainer}>
                        <LoginWithButton/>
                    </div>
                    <div className = {classes.btnContainer}>
                        <LoginWithButton/>
                    </div>
                    <div className = {classes.btnContainer}>
                        <LoginWithButton/>
                    </div>
                    <div className = {classes.btnContainer}>
                        <LoginWithButton/>
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

export default Register
