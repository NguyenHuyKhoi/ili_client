import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import CollectionList from './component/CollectionList'
import ProfileHeader from './component/ProfileHeader'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
    }
}))

const ProfilePage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <ProfileHeader/>
            <CollectionList/>
        </div>
    )
}

export default ProfilePage
