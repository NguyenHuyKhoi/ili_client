import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../component/Button'
import HeaderBar from '../../../component/HeaderBar'
import SideMenu from '../../../component/SideMenu'
import { AuthContext } from '../../../context/auth/context'
import { getCollectionsSuccess, selectCollection, startCreateCollection } from '../../../context/collection/actions'
import { CollectionContext, sample_collection } from '../../../context/collection/context'
import { theme } from '../../../theme'
import { LIBRARY_MENUS } from '../../game/library'
import CollectionList from './component/CollectionList'
import CreateModal from './component/CreateModal'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',

    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(3),
        paddingRight: theme.spacing(3   )
    }
}))

const CollectionLibraryPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [modal, setModal] = useState({})
    const {collections, dispatch} = useContext(CollectionContext)
    const {token} = useContext(AuthContext)
    useEffect(() => {
        getCollections()
        return () => {
            
        }
    }, [])

    const getCollections = () => {
        axios.get('collection/library', {
            headers: {
                'x-access-token': token
            }
        }) 
        .then ((res) => {
            dispatch(getCollectionsSuccess(res.data))
        })   
    }

    const handleCreate = () => {
        dispatch(startCreateCollection())
        return navigate('/collection/creator', {replace: false})
    }

    return (
        <div className = {classes.container}>
            <CreateModal 
                open =  {modal.state === 'create'}     
                onClose = {() => setModal({})}
                onDone = {handleCreate}/>
            <HeaderBar selectedIndex = {2}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu 
                        selectedIndex = {1}
                        menus = {LIBRARY_MENUS}
                        onSelectItem = {() => {}}/>
                </Grid>
                <Grid item sm={10} sx = {{
                    backgroundColor: theme.palette.background.main, height: '92vh'
                }}>
                    <div className= {classes.body}>
                        <div className= {classes.header} >
                            <div/>
                            <Button 
                                variant= 'primary' 
                                //onClick = {() => setModal({state: 'create'})}
                                onClick = {handleCreate}
                                label = {'Create one'}/>
                        </div>
                        <CollectionList collections = {collections}
                            onClickEmpty = {() => setModal({state: 'create'})}/>
                    </div>
                
                </Grid>
            </Grid>
        </div>
    )
}

export default CollectionLibraryPage
