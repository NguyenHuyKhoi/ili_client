import { Add, ArrowBackIosOutlined, ArrowForwardIosOutlined, Check, ClassSharp, CropSquare, MoreVert, Square } from '@mui/icons-material'
import { AppBar, Avatar, Button, Chip, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { grey, blue } from '@mui/material/colors';
import CollectionSlideItem from './CollectionSlideItem'
import CollectionFilter from './CollectionFilter'
import { CollectionContext } from '../../../../context/collection/context'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display: 'flex',
        flexDirection:'column',
    },
    filter: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        backgroundColor: 'white',
        marginTop: theme.spacing(4)
    },
    item: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10)
    }
}))



const CollectionList = () => {
    const classes = useStyles()
    const {collections} = useContext(CollectionContext)
    let nonEmptyCollections = collections.filter((item) => item.games.length > 0)
    return (
        <div className = {classes.container}>
            <div className= {classes.filter}>
                <CollectionFilter collections = {nonEmptyCollections}/>
            </div>

            <div className = {classes.list} >
                {
                    nonEmptyCollections.map((item, index) => (
                        <div className = {classes.item}   key = {''+index}>
                            <CollectionSlideItem collection = {item}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CollectionList
