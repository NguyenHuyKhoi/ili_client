import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../asset/image/logo.png'
import { logoutSuccess } from '../context/auth/actions'
import { AuthContext } from '../context/auth/context'
import { theme } from '../theme'
import HeaderTabbar from './HeaderTabbar'
import IconButton from './IconButton'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: '1px 3px 1px #f2f2f2',
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1),
        paddingRight:  theme.spacing(2),
        height : theme.spacing(7)
    },
    logo: {
        height: theme.spacing(5),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        height: theme.spacing(6),
        '&:hover': {
            cursor: 'pointer'
        }
    }
}))


const tabs = [
    {
        label: 'Manage',
        link: '/admin/manage/user',
        icon: 'ExploreOutlined'
    },
    {
        label: 'Discover',
        link: '/game/search',
        icon: 'ExploreOutlined'
    }
]

const AdminQuestionBanksPage = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const authDispatch = useContext(AuthContext).dispatch
    const {user, token} = useContext(AuthContext)
    const {selectedIndex} = props 
      
    const handleLogout = (e) => {
        e.preventDefault()
        axios.post('auth/logout', null, {
                headers: {
                    'x-access-token': token
                }
            })
        .then((res) => {
            console.log("Logout success")
            authDispatch(logoutSuccess())
            return navigate('/', {replace: true})
        })   
    }
    
    const handleGoProfile = () => {
            return navigate(`/user/setting`, {replace: true})
    }


    return (
        <div className = {classes.container}>
            <div onClick = {() => navigate('/', {replace: true})}>
                <img src = {logo} className = {classes.logo} alt = 'Logo'/>
            </div>
            
            <HeaderTabbar tabs = {tabs} selectedIndex = {selectedIndex}/>
            <IconButton 
                icon = 'Person'
                size = 'small'
                variant = 'primary'
                style = {{marginLeft: theme.spacing(3), marginRight: theme.spacing(3)}}
                onClick = {handleGoProfile}/>
            <IconButton 
                icon = 'Logout'
                size = 'small'
                variant = 'error'
                onClick = {handleLogout}/>
        </div>
    )
}

export default AdminQuestionBanksPage
