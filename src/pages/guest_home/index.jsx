import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import GuestHeaderBar from '../../components/GuestHeaderBar'
import HeaderBar from '../../components/HeaderBar'
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: grey[300],
        flex: 1,
        height: '100vh'
    }
}))

const GuestHome = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <GuestHeaderBar/>
        </div>
    )
}

export default GuestHome
