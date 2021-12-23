import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/auth/context'
import { getCollectionLibraryAPI } from '../../../context/collection/apiCalls'
import { CollectionContext } from '../../../context/collection/context'
import { profileDetailSuccess } from '../../../context/user/actions'
import { UserContext } from '../../../context/user/context'
import CollectionList from './component/CollectionList'
import ProfileHeader from './component/ProfileHeader'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
    }
}))

const ProfilePage = (props) => {
    const classes = useStyles()
    const {id} = useParams()

    const {user, dispatch} = useContext(UserContext)
    const collectionDispatch =  useContext(CollectionContext).dispatch

    const me = useContext(AuthContext).user
    useEffect(() => {
        axios.get('user/'+ id, {
            headers: {
                'x-access-token': me.accessToken
            }
        })    
        .then ((res) => {
            dispatch(profileDetailSuccess(res.data))
        })

        getCollectionLibraryAPI(
            id, 
            me.accessToken,
            collectionDispatch
        )
        return () => {
            
        }
    }, [id])

    return (
        <div className = {classes.container}>
            <ProfileHeader user = {user}/>
            <CollectionList/>
        </div>
    )
}

export default ProfilePage
