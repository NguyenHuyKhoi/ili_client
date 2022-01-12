import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/auth/context'
import { getCollectionsSuccess } from '../../../context/collection/actions'
import { CollectionContext } from '../../../context/collection/context'
import { profileDetailSuccess } from '../../../context/user/actions'
import { UserContext } from '../../../context/user/context'
import CollectionList from './component/CollectionList'
import ProfileHeader from './component/ProfileHeader'
import HeaderBar from '../../../component/HeaderBar'
import ProfileBody from './component/ProfileBody'
import { getGamesSuccess } from '../../../context/game/other/actions'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.palette.background.main,
        height: '100vh',
        overflow: 'scroll'
    }
}))

const ProfilePage = (props) => {
    const classes = useStyles()
    const {id} = useParams()

    const {user, dispatch} = useContext(UserContext)

    const {token} = useContext(AuthContext)
    useEffect(() => {
        axios.get('user/'+ id, {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            dispatch(profileDetailSuccess(res.data))
        })

        axios.get('collection/library/' + id, {
            headers: {
                'x-access-token': token
            }
        })   

        axios.get('game/library/' + id, {
            headers: {
                'x-access-token': token
            }
        })  
        .then ((res) => {
            dispatch(getGamesSuccess(res.data))
        }) 
        return () => {
            
        }
    }, [id])

    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <ProfileHeader user = {user}/>
            <ProfileBody/>
        </div>
    )
}

export default ProfilePage
