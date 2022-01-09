import { Fullscreen, Language } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(1.5)
    },
    langContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(3),
        alignSelf: 'flex-start'
    },

    btns:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    btnIcon: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: theme.spacing(2),
        backgroundColor: 'white',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

}))
const Header = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>   
            <div className = {classes.langContainer}>
                <Language   sx = {{color: 'black', fontSize: 20}} />
                <Typography variant = 'subtitle1' sx  ={{ml: theme.spacing(1),fontWeight: 'bold', color: 'black'}}>EN</Typography>
            </div>
            <Typography variant = 'h3'  
                sx  ={{ color: 'white', fontWeight: 'bold'}}> 
                Ili
            </Typography>
            <div className = {classes.btns}>
                <div className = {classes.btnIcon}>
                    <Fullscreen sx = {{color: 'black', fontSize: 20}} />
                </div>
            </div>
        </div>
    )
}

export default Header
