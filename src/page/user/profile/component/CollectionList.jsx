import { Add, ArrowBackIosOutlined, ArrowForwardIosOutlined, Check, ClassSharp, CropSquare, MoreVert, Square } from '@mui/icons-material'
import { AppBar, Avatar, Button, Chip, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { grey, blue } from '@mui/material/colors';
import CollectionSlideItem from './CollectionSlideItem'
import CollectionFilter from './CollectionFilter'
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
    return (
        <div className = {classes.container}>
            <div className= {classes.filter}>
                <CollectionFilter/>
            </div>

            <div className = {classes.list} >
                {
                    Array.from(Array(3)).map((_, index) => (
                        <div className = {classes.item}>
                            <CollectionSlideItem/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CollectionList
