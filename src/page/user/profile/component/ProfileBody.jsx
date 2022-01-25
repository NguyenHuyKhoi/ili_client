import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import Tabbar from '../../../../component/Tabbar'
import GameList from '../../../game/search/component/GameList'
import CollectionList from './CollectionList'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        maxHeight: '100vh',
        display: 'flex',
        flexDirection:'column',
        backgroundColor: theme.palette.background.main
    },
    body: {
        display:'flex',
        flexDirection:'column',
        marginTop: theme.spacing(5)
    },
}))

const ProfileBody = () => {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState(0)
    return (
        <div className = {classes.container}>
            <div className = {classes.tabsContainer}>
                <Tabbar 
                    tabs = {['Games', 'Collections']}
                    selectedIndex = {selectedIndex}
                    onClickTab = {(index) => setSelectedIndex(index)}
                    />
            </div>
            <div className = {classes.body} >
            {
                selectedIndex===0?  <GameList/>
                : selectedIndex===1?  <CollectionList/>
                : null
            }
            </div>
        </div>
    )
}

export default ProfileBody
