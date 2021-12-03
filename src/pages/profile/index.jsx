import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import CollectorList from './components/CollectorList'
import ProfileHeader from './components/ProfileHeader'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
    }
}))

const Profile = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <ProfileHeader/>
            <CollectorList/>

        </div>
    )
}

export default Profile
