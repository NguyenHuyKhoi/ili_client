import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../component/Button'
import EmptyBox from '../../../component/EmptyBox'
import NotificationModal from '../../../component/NotificationModal'
import { AuthContext } from '../../../context/auth/context'
import { saveCollectionSetting } from '../../../context/collection/actions'
import { CollectionContext } from '../../../context/collection/context'
import { getGamesSuccess } from '../../../context/game/other/actions'
import FirebaseHelper, { IMAGE_CATEGORIES } from '../../../firebase'
import { theme } from '../../../theme'
import AddGamesModal from './component/AddGamesModal'
import CollectorInfor from './component/CollectorInfor'
import GameList from './component/GameList'
import SettingModal from './component/SettingModal'
import Topbar from './component/Topbar'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.palette.background.main,
        overflowY: 'hidden'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: theme.spacing(3)
    },
    collectionsContainer: {
        padding: theme.spacing(2),
    },
    emptyDiv: {
        height: 120,
        border: '1px dashed #000',
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
    const {collection, dispatch} = useContext(CollectionContext)
    const {games} = collection
    const [modal, setModal] = useState({state: ''})
    useEffect(() => {
        axios.get('game/library', {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            dispatch(getGamesSuccess(res.data))
        })
        return () => {
            
        }
    })

    const handleSaveToServer = async () => {
        var {cover} = collection 
        let temp = JSON.parse(JSON.stringify(collection))
        temp.games = collection.games.map((item) => item._id)

		var coverUrl =  await FirebaseHelper.uploadImage(cover, IMAGE_CATEGORIES.COLLECTION_COVER) 
        console.log("Cover url:", coverUrl);
        axios.put('collection/'+collection._id, {
            ...temp,
            cover: coverUrl
        }, {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            setModal({state: 'success'})
        })
    }

    const handleSaveSetting = (setting) => {
        dispatch(saveCollectionSetting({
            ...collection,
            ...setting
        }))
        setModal({})
    }

    const handleDelete = () => {
        console.log("Hadnle delete collection")
        axios.delete('collection/' + collection._id, {
            headers: {
                'x-access-token': token
            }
        })
        .then((res) => {
            setModal({
                state: 'success',
                title: 'Done !',
                desc: 'This collection has been deleted',
                btnLabel: 'OK'
            })
        })   
        .catch((err) => {
            console.log("Err: ", err)
            setModal({
                state: 'success',
                title: 'Error !',
                desc: 'Try again, later',
                btnLabel: 'OK',
                variant: 'error'
            })
        })
    }
    return (
        <div className = {classes.container}>
            <Topbar 
                collection = {collection}
                onExit = {() => {}}
                onSave = {handleSaveToServer}
                onSetting = {() => setModal({state: 'setting'})}/>
            <SettingModal 
                setting = {{
                    title: collection.title,
                    description: collection.description,
                    cover: collection.cover,
                    visibility: collection.visibility
                }}
                open = {modal.state ==='setting'}
                onClose = {() => setModal({})}
                onDone = {handleSaveSetting}
            />
            <NotificationModal 
                title = 'Done!'
                btnLabel = 'Go Library'
                desc = 'See results in library.'
                open = { modal.state ==='success' }     
                onClose = {() => setModal({})}
                onDone = {() => {
                    setModal({})
                    return navigate('/collection/library', {replace: true})
                }}/>
            <AddGamesModal 
                open = {modal.state ==='add_games'}
                onClose = {() => setModal({})}
            />
            <Grid container sx = {{mt: theme.spacing(8)}} columnSpacing={2}>
                <Grid item sm={3} >
                    <CollectorInfor 
                        collection = {collection}
                        onDelete = {handleDelete}/>
                </Grid>

                <Grid item sm={9}>
                    <div className= {classes.body}>
                        <div className= {classes.header} >
                            <div/>
                            <Button   
                                variant = 'primary'  
                                label = 'Add games'
                                style = {{width: theme.spacing(22)}}
                                onClick = {() => setModal({state: 'add_games'})}/>
                            
                        </div>
                        {
                               games.length ===0? 
                                <EmptyBox 
                                    style = {{width: '80%', alignSelf: 'center', marginTop: theme.spacing(2)}}
                                    label = 'Add a game? Click me!'
                                    onClick = {() => setModal({state: 'add_games'})}/>
                                :
                                <div className= {classes.collectionsContainer}>
                                      <GameList games = {games} />
                                </div>
                        }

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CollectionEditPage
