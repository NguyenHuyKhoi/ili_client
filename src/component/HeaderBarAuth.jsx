import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../asset/image/logo.png'
import { logoutSuccess } from '../context/auth/actions'
import { AuthContext } from '../context/auth/context'
import { startCreateGame } from '../context/game/creator/actions'
import { GameCreatorContext } from '../context/game/creator/context'
import { theme } from '../theme'
import Button from './Button'
import IconButton from './IconButton'
import HeaderTabbar from './HeaderTabbar'
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
        marginRight: theme.spacing(2)
    }
}))


const tabs = [
    {
        label: 'Home',
        link: '/',
        icon: 'Home'
    },
    {
        label: 'Discover',
        link: '/game/search',
        icon: 'ExploreOutlined'
    },
    {
        label: 'Library',
        link: '/game/library',
        icon: 'TocOutlined'
    },
    {
        label: 'Match',
        link: '/match/library',
        icon: 'BarChartOutlined'
    }
]

const HeaderBarAuth = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const gameCreatorDispatch = useContext(GameCreatorContext).dispatch
    const authDispatch = useContext(AuthContext).dispatch
    const {user, token} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {selectedIndex} = props 
    const {avatar} = user 
      
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
        })   
    }
    
    const handleGoProfile = () => {
            return navigate(`/profiles/${user._id}`, {replace: true})
    }


    const handleCreate = () => {
        gameCreatorDispatch(startCreateGame())
        navigate('/game/creator',{replace: true})
    }

    const handleJoin = () => {
        navigate('/match/player/entrance',{replace: true})
    }
    return (
        <div className = {classes.container}>
            <div onClick = {() => navigate('/', {replace: true})}>
                <img src = {logo} className = {classes.logo}/>
            </div>
            
            <HeaderTabbar tabs = {tabs} selectedIndex = {selectedIndex}/>
            <Button 
                size = 'small'
                variant = 'primary'
                label = 'Create Game'
                onClick = {handleCreate}/>

            <Button 
                size = 'small'
                variant = 'success'
                style = {{marginLeft: theme.spacing(3)}}
                label = 'Join Game'
                onClick = {handleJoin}/>
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

export default HeaderBarAuth
