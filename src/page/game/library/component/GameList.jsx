import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import EmptyBox from '../../../../component/EmptyBox'
import { AuthContext } from '../../../../context/auth/context'
import { getGamesSuccess } from '../../../../context/game/other/actions'
import { GameContext } from '../../../../context/game/other/context'
import { theme } from '../../../../theme'
import { GameRowItem } from '../../component/GameRowItem'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        height: '100vh',
        display: 'flex',
        flexDirection:'column',
        backgroundColor: theme.palette.background.main
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
        marginBottom: theme.spacing(3),
        alignSelf:'baseline'
    },
    tabs: {
        display: 'flex',
        flexDirection:'row',
        borderRadius: theme.spacing(0.5),
        alignSelf:'baseline',
    },
    tab: {
        flex: 1,
        padding: theme.spacing(0.8),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',

    }
}))

const TabItem = (props) => {
    const classes = useStyles()
    const handleClick = () => {
        if (props.handleItemClick != undefined) {
            props.handleItemClick()
        }
    }

    var primary = theme.palette.primary.main
    return (
        <div className = {classes.tab} 
            onClick = {handleClick} 
            style = {{
                border:'solid 2px #000000',
                backgroundColor: props.isSelected ? primary: 'rgba(0,0,0,0)'
            }}>
            <Typography variant = 'label' 
                style= {{ color: '#000000', fontWeight: 'bold'}}>
                    {props.title}
            </Typography>
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
                        <TabItem 
                            title ={item} 
                            handleItemClick = {() => handleItemClick(index)}
                            isSelected = {selectedIndex == index}/>
                    </div>
                ))
            }
        </div>
    )
}

const GameList = (props) => {
    const classes = useStyles()
    const {token} = useContext(AuthContext)
    const {games, dispatch} = useContext(GameContext)
    useEffect(() => {
        axios.get('game/library?status=complete', {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            dispatch(getGamesSuccess(res.data))
        })
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
            {
                games.length == 0 ?
                <EmptyBox
                    style= {{width: '100%', marginTop: theme.spacing(5)}}
                    label = " You don't have yet any collections. Create one?"
                    onClick = {() => {
                        if (props.onClickEmpty) props.onClickEmpty()
                    }}/>
                :
                <div className = {classes.games} >
                    {
                        games.map((item, index) => (
                            <div className = {classes.gameContainer}   key = {''+index}>
                                <GameRowItem game = {item}/>
                            </div>
                        ))
                    }
                    </div>
            }
            
        </div>
    )
}

export default GameList
