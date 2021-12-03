import { AppBar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../theme'
const useStyles = makeStyles((theme) => ({
  
}))

const Topbar = () => {
    const classes = useStyles()
    return (
        <AppBar position = 'fixed' sx = {{height: 60}}>
        </AppBar>
    )
}

export default Topbar
