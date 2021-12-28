import { Add } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth/context'
import { saveLocalEditedCollection } from '../../../context/collection/actions'
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
        backgroundColor:'#f2f2f2',
        height: '100vh'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        backgroundColor: 'white',
    },
    collectionsContainer: {
        backgroundColor: '#f2f2f2',
        padding: theme.spacing(2),
        boxShadow: "1px 4px 6px #5f5f5f"
    },
    emptyDiv: {
        height: 120,
        border: '1px dashed #5f5f5f',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'row',
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
        let temp = {...collection}
        temp.games = collection.games.map((item) => item._id)

        axios.put('collection/'+collection._id, temp, {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            setModal({state: 'success'})
        })
    }

    const handleSave = (setting) => {
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
                open = {modal.state == 'success'}
                onClose = {() => setModal({})}
                onDone = {() => {navigate(-1)}}
            />
            <AddGamesModal 
                open = {modal.state == 'add_games'}
                onClose = {() => setModal({})}
                onDone = {handleSave}
            />
            <Grid container sx = {{mt: theme.spacing(8), p: theme.spacing(3)}} columnSpacing={2}>
                <Grid item sm={3} >
                    <CollectorInfor onSetting = {() =>setModal({state: 'setting'})}/>
                </Grid>

                <Grid item sm={9}>
                    <div className= {classes.body}>
                        <div className= {classes.header} >
                            <Typography variant= 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333'}}>
                                Collection Content
                            </Typography>

                            <Typography variant= 'subtitle2' sx = {{ color: '#5f5f5f', mt: theme.spacing(1)}}>
                                Create a series of games.
                            </Typography>
                            <div style = {{marginTop: theme.spacing(1)}}>
                                <Button     
                                    sx = {{color: 'white', fontWeight: 'bold', textTransform: 'none'}}
                                    variant= 'contained' 
                                    onClick = {() => setModal({state: 'add_games'})}>
                                    Add game
                                </Button>
                            </div>
                            
                        </div>
                        <div className= {classes.collectionsContainer}>
                            {
                                games.length == 0? 
                                <div className= {classes.emptyDiv} onClick = {() => setModal({state: 'add_games'})}>
                                    <Add sx = {{color: '#333333', fontSize: 30, mr: theme.spacing(1)}}/>
                                    <Typography variant='subtitle1' sx = {{color: '#333333'}}>
                                        Add a game
                                    </Typography>
                                </div>
                                :
                                <GameList games = {games} />
                            }
                        </div>
                      
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CollectionEditPage
