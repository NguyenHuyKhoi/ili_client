import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import HeaderBar from '../../../component/HeaderBar'
import SideMenu from '../../../component/SideMenu'
import { AuthContext } from '../../../context/auth/context'
import { getMatchesSuccess } from '../../../context/match/other/actions'
import { MatchContext } from '../../../context/match/other/context'
import MatchTable from './component/MatchTable'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    body: {
        padding: theme.spacing(10),
        backgroundColor: theme.palette.background.main,
        height: '92vh'
    }
}))

export const MATCH_MENUS = [
    {
        title: 'Join as Host',
        icon: 'TableRows',
        params: {
            role: 'host',
            mode: 'classic'
        }
    },
    {
        title: 'Join as Player',
        icon: 'TableRows',
        params: {
            role: 'player',
            mode: 'classic'
        }
    },
    {
        title: 'Livestream',
        icon: 'SnippetFolder',
        params: {
            role: 'host',
            mode: 'livestream'
        }
    },
]

const MatchLibraryPage = () => {
    const classes = useStyles()

    const {token} = useContext(AuthContext)
    const {dispatch} = useContext(MatchContext)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isFetching, setIsFetching] = useState(false)
    useEffect(() => {
       getMatches(MATCH_MENUS[selectedIndex].params)
       return () => {
            
        }
    })

    const getMatches = (params) => {
        setIsFetching(true)
        // console.log("Get matches :", params)
        // setIsFetching(false)
        axios.get('match/library', {
            headers: {
                'x-access-token': token
            },
            params
        })
        .then ((res) => {

            console.log("Get matches: ", res.data)
            dispatch(getMatchesSuccess(res.data))
        })
        .catch((err) => {
            console.log("Error :", err.response.data)
        })
        .finally(() => {
            setIsFetching(false)
        })

    }

    const handleSelectSideItem = (selectedIndex) => {
        if (isFetching) return 
        setSelectedIndex(selectedIndex)
        getMatches(MATCH_MENUS[selectedIndex].params)
    }
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {3}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu 
                        selectedIndex = {selectedIndex}
                        menus = {MATCH_MENUS}
                        onSelectItem = {handleSelectSideItem} />
                </Grid>
                <Grid item sm={10}>
                    <div className= {classes.body}>
                        <MatchTable />
                    </div>
                </Grid>
            </Grid>
           
          
        </div>
    )
}

export default MatchLibraryPage
