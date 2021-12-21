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
        backgroundColor: grey[100],
        display: 'flex',
        flexDirection:'column',
    },
    filter: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        backgroundColor: 'white',
        marginTop: theme.spacing(3)
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
    return (
        <div className = {classes.container}>
            <div className= {classes.filter}>
                <CollectionFilter collections = {collections}/>
            </div>

            <div className = {classes.list} >
                {
                    collections.map((item, index) => (
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
