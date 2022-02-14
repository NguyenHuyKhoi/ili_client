import { Alert, Grid, Snackbar } from '@mui/material'
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
import LoadingModal from '../../../component/LoadingModal'
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

const CollectionCreatorPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {token} = useContext(AuthContext)
    const {collection, dispatch, mode} = useContext(CollectionContext)
    const {games} = collection
    const [modal, setModal] = useState({state: ''})
    const [alert, setAlert] = useState({});
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
    }, [])

    const checkCollectionSetting = () => {
        if (collection.title == null || collection.title == '') {
            setAlert({
                type: 'error',
                msg: 'Title of collection can not be empty'
            })
            return false
        }
        return true
    }

    const preprocessCollection = async (collection) => {
        var {cover} = collection 
        let res = {...collection}
        res.games = collection.games.map((item) => item._id)

		res.cover = await FirebaseHelper.uploadImage(cover, IMAGE_CATEGORIES.COLLECTION_COVER) 
        return res
    }

    const handleCreate = async () => {
        if (checkCollectionSetting() == false) {
            return
        }
        
        console.log("Set modal state loading:")
        setModal({state: 'loading'})
        let temp = await preprocessCollection(collection)
        axios.post('collection/', temp, {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            setModal({
                state: 'success',
                title: 'Done!',
                desc: 'Create collection successfully',
                btnLabel: 'Go library'
            })
        })
        .catch((err) => {
            setModal({})
            console.log("Error:", err);
        })
    }
    const handleUpdate = async () => {
        if (checkCollectionSetting() == false) {
            return
        }
        
        setModal({state: 'loading'})
        let temp = await preprocessCollection(collection)
        console.log("Temp ocllection:", temp);
        axios.put('collection/'+collection._id, {
            ...temp
        }, {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            setModal({
                state: 'success',
                title: 'Done!',
                desc: 'Update collection successfully',
                btnLabel: 'Go library'
            })
        })
        .catch((err) => {
            console.log("Error on update: ", err)
            setModal({})
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
                btnLabel: 'Go library'
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
    console.log("Modal state: ", modal.state)
    return (
        <div className = {classes.container}>
            <Snackbar open={alert.type !== undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {
                        alert.msg
                    }
                </Alert>
            </Snackbar>
            <Topbar 
                collection = {collection}
                mode = {mode}
                onExit = {() => {}}
                onSave = {async() => {
                    if (mode == 'create') {
                        await handleCreate()
                    }
                    else {  
                        await handleUpdate()
                    }
                }}
                onSetting = {() => setModal({state: 'setting'})}/>
            <LoadingModal 
                open = {modal.state == 'loading'}/>
            <SettingModal 
                setting = {{
                    title: collection.title,
                    description: collection.description,
                    cover: collection.cover,
                    visibility: collection.visibility
                }}
                open = {modal.state =='setting'}
                onClose = {() => setModal({})}
                onDone = {handleSaveSetting}
            />
            <NotificationModal 
                title = {modal.title}
                btnLabel = {modal.btnLabel}
                desc = {modal.desc}
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
                        mode = {mode}
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

export default CollectionCreatorPage
