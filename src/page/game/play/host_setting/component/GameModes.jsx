import { Button, Switch, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
import { Grid } from '@mui/material'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(10)
    },
    item: {
        height: theme.spacing(20),
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        padding: theme.spacing(1.5),
        paddingTop: theme.spacing(6)
    },
    logo: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        borderRadius: theme.spacing(5),
        position: 'absolute',
        top: theme.spacing(-5),
        left: 0,
        right: 0,
        margin: 'auto'
    },
    infor: {
        flex: 1, 
        flexDirection: 'column'
    },
}))

const ModeItem = () => {
    const classes = useStyles()
    return (
        <div className = {classes.item}>
            <img src = 'https://dothethao.net.vn/wp-content/uploads/2020/06/logo-ha-noi-fc.jpg' 
                className = {classes.logo}/>
            <div className = {classes.infor}>
                <Typography variant = 'h6' 
                    sx = {{
                        color: 'white', fontWeight: 'bold', alignSelf: 'center', textAlign: 'center'}}>
                    Mode Title
                </Typography>
                <Typography variant = 'subtitle1' 
                    sx = {{
                        color: 'white', alignSelf: 'center', textAlign: 'center', my: theme.spacing(1), 
                            px: theme.spacing(6)}}>
                    Lorem ipsum dolor sit amet consrat quam quibusdam. uam quibusdam.
                </Typography>
            </div>
      

            <Button variant = 'contained'>
                Choose Mode
            </Button>
        </div>
    )
}

const GameModes = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Grid container columnSpacing = {6} rowSpacing = {6}>
                {
                    Array.from(Array(4)).map((_, index) => (
                        <Grid item xs = {6}>
                            <ModeItem/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}
export default GameModes
