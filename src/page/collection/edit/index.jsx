import { Button, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth/context'
import { saveLocalEditedCollection } from '../../../context/collection/actions'
import { editCollectionAPI } from '../../../context/collection/apiCalls'
import { CollectionContext } from '../../../context/collection/context'
import { getGamesSuccess } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import { theme } from '../../../theme'
import AddGamesModal from './component/AddGamesModal'
import CollectorInfor from './component/CollectorInfor'
import GameList from './component/GameList'
import SettingModal from './component/SettingModal'
import SuccessModal from './component/SuccessModal'
import Topbar from './component/Topbar'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: grey[100],
        padding: 0
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(5)
    }
}))

const CollectionEditPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {token} = useContext(AuthContext)
    const gameDispatch = useContext(GameContext).dispatch
    const {collection, dispatch, isSuccess} = useContext(CollectionContext)
    const {games, owner} = collection
    const [modal, setModal] = useState({state: ''})
    useEffect(() => {
        axios.get('game/library?status=complete', {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            dispatch(getGamesSuccess(res.data))
        })
        return () => {
            
        }
    }, [])

    const handleSaveToServer = () => {
        editCollectionAPI({...collection}, token, dispatch)
    }

    const handleSave = (setting) => {
        console.log("Handle save", setting)
        dispatch(saveLocalEditedCollection(setting))
        setModal({})
    }
    return (
        <div className = {classes.container}>
            <Topbar 
                collection = {collection}
                onExit = {() => {}}
                onSave = {handleSaveToServer}
                onSetting = {() => setModal({state: 'setting'})}/>
            <SettingModal 
                setting = {collection}
                open = {modal.state == 'setting'}
                onClose = {() => setModal({})}
                onDone = {handleSave}
            />
            <SuccessModal 
                open = {isSuccess}
                onClose = {() => setModal({})}
                onDone = {() => {navigate(-1)}}
            />
            <AddGamesModal 
                open = {modal.state == 'add_games'}
                onClose = {() => setModal({})}
                onDone = {handleSave}
            />
            <Grid container sx = {{mt: theme.spacing(10), p: theme.spacing(3)}} columnSpacing={2}>
                <Grid item sm={3} >
                    <CollectorInfor onSetting = {() =>setModal({state: 'setting'})}/>
                </Grid>

                <Grid item sm={9}>
                    <div className= {classes.body}>
                        <div className= {classes.header} >
                            <Typography variant= 'h5' sx = {{fontWeight: 'bold'}}>
                                Collection Content
                            </Typography>
                            <Button variant= 'contained' onClick = {() => setModal({state: 'add_games'})}>
                                Add kahot
                            </Button>
                        </div>
                        {
                            games.length == 0? 
                            <Typography variant='h6' sx = {{alignSelf: 'center'}}>
                                No games
                            </Typography>
                            :
                            <GameList games = {games} />
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CollectionEditPage
