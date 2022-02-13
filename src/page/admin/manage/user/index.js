import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import HeaderBar from '../../../../component/HeaderBar'
import SideMenu from '../../../../component/SideMenu'
import { AuthContext } from '../../../../context/auth/context'
import { CollectionContext } from '../../../../context/collection/context'
import { theme } from '../../../../theme'
import UserList from './component/UserList'


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

export const ADMIN_MANAGE_MENUS = [
    {
        link: '/admin/manage/user',
        title: 'User',
        icon: 'TableRows'
    },
    {
        link: '/admin/manage/game',
        title: 'Game',
        icon: 'SnippetFolder'
    },
    {
        link: '/admin/manage/collection',
        title: 'Collection',
        icon: 'TableRows'
    },
    {
        link: '/admin/manage/question',
        title: 'Question Bank',
        icon: 'SnippetFolder'
    },
]

const AdminUserManagePage = () => {
    const classes = useStyles()
    const {dispatch} = useContext(CollectionContext)
    const [users, setUsers] = useState([]);
    const {token} = useContext(AuthContext)
    useEffect(() => {
        getUsers()
        return () => {
            
        }
    }, [])

    const getUsers = () => {
        axios.get('user/all', {
            headers: {
                'x-access-token': token
            }
        }) 
        .then ((res) => {
            setUsers(res.data)
        })   
        .catch((err) => {
            console.log("Get user error");
        })
    }

    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {0}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu 
                        selectedIndex = {0}
                        menus = {ADMIN_MANAGE_MENUS}
                        onSelectItem = {() => {}}/>
                </Grid>
                <Grid item sm={10} sx = {{
                    backgroundColor: theme.palette.background.main, height: '92vh'
                }}>
                    <div className= {classes.body}>
                        <UserList 
                            users = {users}/>
                    </div>
                
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminUserManagePage
