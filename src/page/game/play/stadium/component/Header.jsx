import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: theme.spacing(1.5)
    }
}))
const Header = (props) => {
    const classes = useStyles()

    return (
        <div className = {classes.container}>
            <Typography variant = 'h5'> 2/14 </Typography>
            <Typography variant = 'h5'> Quiz </Typography>
            <Typography variant = 'h5'>  </Typography>
        </div>
    )
}

export default Header
