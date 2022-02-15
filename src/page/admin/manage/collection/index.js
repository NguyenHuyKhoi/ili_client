import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../../../component/Button'
import HeaderBar from '../../../../component/HeaderBar'
import SideMenu from '../../../../component/SideMenu'
import { AuthContext } from '../../../../context/auth/context'
import { getCollectionsSuccess } from '../../../../context/collection/actions'
import { CollectionContext } from '../../../../context/collection/context'
import { theme } from '../../../../theme'
import { LIBRARY_MENUS } from '../../../game/library'
import { ADMIN_MANAGE_MENUS } from '../user'
import CollectionList from './component/CollectionList'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(3)
    }
}))

const AdminCollectionManagePage = () => {
    const classes = useStyles()
    const [modal, setModal] = useState({})
    const {collections, dispatch} = useContext(CollectionContext)
    const {token} = useContext(AuthContext)
    useEffect(() => {
        getCollections()
        return () => {
            
        }
    }, [])

    const getCollections = () => {
        axios.get('collection/all', {
            headers: {
                'x-access-token': token
            }
        }) 
        .then ((res) => {
            dispatch(getCollectionsSuccess(res.data))
        })  
        .catch((err) => {
            dispatch(getCollectionsSuccess([]))
        }) 
    }

    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {0}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu 
                        selectedIndex = {2}
                        menus = {ADMIN_MANAGE_MENUS}
                        onSelectItem = {() => {}}/>
                </Grid>
                <Grid item sm={10} sx = {{
                    backgroundColor: theme.palette.background.main, height: '92vh'
                }}>
                    <div className= {classes.body}>
                        <CollectionList collections = {collections}
                            onClickEmpty = {() => setModal({state: 'create'})}/>
                    </div>
                
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminCollectionManagePage
