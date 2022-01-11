import {  Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import HeaderBar from '../../../component/HeaderBar'
import { AuthContext } from '../../../context/auth/context'
import { getCollectionsSuccess } from '../../../context/collection/actions'
import { CollectionContext } from '../../../context/collection/context'
import SideMenu from '../../game/library/component/SideMenu'
import CreateModal from './component/CreateModal'
import CollectionList from './component/CollectionList'
import Button from '../../../component/Button'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.main
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
            <CreateModal 
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
                            <div/>
                            <Button 
                                variant= 'primary' 
                                onClick = {() => setModal({state: 'create'})}
                                label = {'Create one'}/>
                        </div>
                        <CollectionList collections = {collections}/>
                    </div>
                
                </Grid>
            </Grid>
        </div>
    )
}

export default CollectionLibraryPage
