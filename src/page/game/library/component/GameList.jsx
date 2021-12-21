import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../../context/auth/context'
import { getCompleteGamesAPI } from '../../../../context/game/other/apiCalls'
import { GameContext } from '../../../../context/game/other/context'
import { GameRowItem } from '../../component/GameRowItem'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        backgroundColor: grey[100],
        display: 'flex',
        flexDirection:'column',
    },
    games: {
        display:'flex',
        flexDirection:'column'
    },
    gameContainer: {
        marginBottom: theme.spacing(2),
        display:'flex',
        flexDirection:'column'
    },
    tabsContainer: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    tabs: {
        display: 'flex',
        flexDirection:'row',
    },
    tabContainer: {
    },
    tab: {
        padding: theme.spacing(0.8),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      //  borderRadius: theme.spacing(1),
        border: '0.5px solid gray',
    }
}))

const TabItem = (props) => {
    const classes = useStyles()
    const handleClick = () => {
        if (props.handleItemClick != undefined) {
            props.handleItemClick()
        }
    }
    return (
        <div className = {classes.tab} style= {{backgroundColor: props.isSelected? 'white':grey[100]}}
            onClick = {handleClick} >
            <Typography variant = 'caption' style= {{ color: props.isSelected?'blue':'gray', fontWeight: 'bold'}}>{props.title}</Typography>
        </div>
    )
}
export const Tabs = (props) => {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState(0)
    let {tabs} = props
    const handleItemClick = (index) => {
        setSelectedIndex(index)
        if (props.onClickTab) {
            props.onClickTab(index)
        }
    }
    if (tabs == undefined) tabs = []
    return (
        <div className = {classes.tabs}>
            {
                tabs.map((item, index) => (
                    <div className = {classes.tabContainer}   key = {''+index}>
                        <TabItem title ={item} handleItemClick = {() => handleItemClick(index)}
                            isSelected = {selectedIndex == index}/>
                    </div>
                ))
            }
        </div>
    )
}

const GameList = () => {
    const classes = useStyles()
    const {user} = useContext(AuthContext)
    const {games, isLoading, isSuccess, dispatch} = useContext(GameContext)
    useEffect(() => {
        getCompleteGamesAPI(
            user.accessToken,
            dispatch
        )
        return () => {
            
        }
    }, [])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isShowAll, setIsShowAll] = useState(false)
    const handleShowAllChange = () => {
        setIsShowAll(!isShowAll)
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.tabsContainer}>
                <Tabs tabs = {['Recent', 'Draft', 'Favorites']}/>
            </div>
            <div className = {classes.games} >
            {
                games.map((item, index) => (
                    <div className = {classes.gameContainer}   key = {''+index}>
                        <GameRowItem game = {item}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default GameList
