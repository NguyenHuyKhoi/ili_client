import { Add, Check, ClassSharp, CropSquare, Square } from '@mui/icons-material'
import { AppBar, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import LabeledSelect from '../../../components/Select'
import { theme } from '../../../theme'
import { grey, blue } from '@mui/material/colors';
import { GameHorizontalCard } from '../../game_collector/components/GameList'
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
                    <div className = {classes.tabContainer}>
                        <TabItem title ={item} handleItemClick = {() => handleItemClick(index)}
                            isSelected = {selectedIndex == index}/>
                    </div>
                ))
            }
        </div>
    )
}

const GameLibrary = () => {
    const classes = useStyles()
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
                Array.from(Array(3)).map((_, index) => (
                    <div className = {classes.gameContainer}>
                        <GameHorizontalCard/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default GameLibrary
