import { Add, ArrowBackIosOutlined, ArrowForwardIosOutlined, Check, ClassSharp, CropSquare, MoreVert, Square } from '@mui/icons-material'
import { AppBar, Avatar, Button, Chip, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { grey, blue } from '@mui/material/colors';
import { GameCard } from '../../game_search/components/GameList'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        backgroundColor: grey[100],
        display: 'flex',
        flexDirection:'column',
    },
    collector: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingBottom: theme.spacing(5)
    },
    collectorFilter: {
        backgroundColor: 'white',
        marginTop: theme.spacing(3),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterValues: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: theme.spacing(2),
        flexFlow: 'wrap'
        //overflow: 'auto'
    },
    filterValueContainer: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    games: {
        display:'flex',
        flexDirection:'column'
    }
}))

const SlideCollector = (props) => {

    const classes = useStyles()
    return (
        <div className = {classes.collector}>
            
            <div className = {classes.header} > 
                <Typography variant = 'h6'>Title</Typography>
                <Link underline = 'hover' href = '/#' sx = {{color: 'black'}}>See all</Link>
            </div>
            <div className={classes.games}>
                <Grid container sx = {{flex: 1}} columnSpacing = {2} rowSpacing = {2}>
                    {

                        Array.from(Array(4)).map((_, index) => (
                            <Grid item xs = {3}>
                                <GameCard/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    )
}


const CollectorList = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div className = {classes.collectorFilter}>
                <Typography variant = 'subtitle2'>Filter</Typography>
                <div className = {classes.filterValues}>
                    {

                        Array.from(Array(10)).map((_, index) => (
                            <div className = {classes.filterValueContainer}>
                                <Chip label="Chip Filled" />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className = {classes.collectors} >
                {

                    Array.from(Array(3)).map((_, index) => (
                        <div className = {classes.collectorContainer}>
                            <SlideCollector/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CollectorList
