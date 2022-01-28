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

    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(3),
        paddingRight: theme.spacing(3   )
    }
}))


const AdminGameManagePage = () => {
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
        axios.get('collection/library', {
            headers: {
                'x-access-token': token
            }
        }) 
        .then ((res) => {
            dispatch(getCollectionsSuccess(res.data))
        })   
    }

    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {0}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu 
                        selectedIndex = {1}
                        menus = {ADMIN_MANAGE_MENUS}
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
                                onClick = {() => setModal({state: 'create'})}
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

export default AdminGameManagePage
