import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import GuestHeaderBar from '../../../component/GuestHeaderBar'
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: grey[300],
        flex: 1,
        height: '100vh'
    }
}))

const HomeGuestPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <GuestHeaderBar selectedIndex = {0}/>
        </div>
    )
}

export default HomeGuestPage
