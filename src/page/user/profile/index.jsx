import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HeaderBar from '../../../component/HeaderBar'
import { AuthContext } from '../../../context/auth/context'
import { getCollectionsSuccess } from '../../../context/collection/actions'
import { CollectionContext } from '../../../context/collection/context'
import { getGamesSuccess } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import { profileDetailSuccess } from '../../../context/user/actions'
import { UserContext } from '../../../context/user/context'
import ProfileBody from './component/ProfileBody'
import ProfileHeader from './component/ProfileHeader'
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

    const {user} = useContext(UserContext)
    const userDispatch = useContext(UserContext).dispatch
    const gameDispatch = useContext(GameContext).dispatch
    const collectionDispatch = useContext(CollectionContext).dispatch

    const {token} = useContext(AuthContext)
    useEffect(() => {
        // Get user profile
        axios.get('user/'+ id, {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            userDispatch(profileDetailSuccess(res.data))
        })

        // Get game profile
        axios.get('game/search', { 
            params: [{
                userId: id
            }]
        })    
        .then ((res) => {
            console.log("Game game res: ", res)
            gameDispatch(getGamesSuccess(res.data))
        })
        .catch ((err) => {
            console.log("Get game error: ", err)
        })

        // Get collection profile
        axios.get('collection/search', { 
            params: {
                userId: id
            }
        })    
        .then ((res) => {
            collectionDispatch(getCollectionsSuccess(res.data))
        })
        .catch ((err) => {
            console.log("Get game error: ", err)
        })
        return () => {
            
        }
    })

    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <ProfileHeader user = {user}/>
            <ProfileBody/>
        </div>
    )
}

export default ProfilePage
