import { Button, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import HeaderBar from '../../../component/HeaderBar'
import { AuthContext } from '../../../context/auth/context'
import { getCollectionsSuccess } from '../../../context/collection/actions'
import { CollectionContext } from '../../../context/collection/context'
import SideMenu from '../../game/library/component/SideMenu'
import CollectionCreateModal from './component/CollectionCreateModal'
import CollectionList from './component/CollectionList'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F2F2F2'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing(4),
        padding: theme.spacing(2)
    }
}))

const CollectionLibraryPage = () => {
    const classes = useStyles()
    const [modal, setModal] = useState({})
    const {collections, dispatch} = useContext(CollectionContext)
    const {token, user} = useContext(AuthContext)
    useEffect(() => {
        getCollections()
        return () => {
            
        }
    }, [])

    const getCollections = () => {
        axios.get('collection/library/' + user._id, {
            headers: {
                'x-access-token': token
            }
        }) 
        .then ((res) => {
            dispatch(getCollectionsSuccess(res.data))
        })   
    }

    const handleCreate = (collection) => {
        axios.post('collection/', collection, {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            getCollections()
            setModal({})
        })
    }

    return (
        <div className = {classes.container}>
            <CollectionCreateModal 
                open =  {modal.state === 'create'}     
                onClose = {() => setModal({})}
                onDone = {handleCreate}/>
            <HeaderBar selectedIndex = {2}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu selectedIndex = {1}/>
                </Grid>
                <Grid item sm={10}>
                    <div className= {classes.body}>
                        <div className= {classes.header} >
                            <Typography variant= 'h6' sx = {{fontWeight: 'bold', color: '#333333'}}>
                                Collections
                            </Typography>
                            <Button variant= 'contained' onClick = {() => setModal({state: 'create'})}
                                sx = {{color: 'white', fontWeight: 'bold', textTransform: 'none'}}>
                                Create
                            </Button>
                        </div>
                        <CollectionList collections = {collections}/>
                    </div>
                
                </Grid>
            </Grid>
        </div>
    )
}

export default CollectionLibraryPage
