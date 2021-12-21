import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext, useEffect} from 'react'
import { UserContext } from '../../../context/user/context'
import { AuthContext } from '../../../context/auth/context'
import CollectionList from './component/CollectionList'
import ProfileHeader from './component/ProfileHeader'
import {profileDetailAPI} from '../../../context/user/apiCalls'
import { useLocation, useParams } from 'react-router-dom'
import { getCollectionLibraryAPI } from '../../../context/collection/apiCalls'
import { CollectionContext } from '../../../context/collection/context'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
    }
}))

const ProfilePage = (props) => {
    const classes = useStyles()
    const {id} = useParams()
    const location = useLocation()

    const {user, dispatch} = useContext(UserContext)
    const collectionDispatch =  useContext(CollectionContext).dispatch

    const me = useContext(AuthContext).user
    useEffect(() => {
        console.log("User Id :", id)
        profileDetailAPI(
            id,
            me.accessToken,
            dispatch
        )

        getCollectionLibraryAPI(
            id, 
            me.accessToken,
            collectionDispatch
        )
        return () => {
            
        }
    }, [user._id])
    return (
        <div className = {classes.container}>
            <ProfileHeader user = {user}/>
            <CollectionList/>
        </div>
    )
}

export default ProfilePage
