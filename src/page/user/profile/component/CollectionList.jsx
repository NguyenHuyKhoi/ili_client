import { Add, ArrowBackIosOutlined, ArrowForwardIosOutlined, Check, ClassSharp, CropSquare, MoreVert, Square } from '@mui/icons-material'
import { AppBar, Avatar, Button, Chip, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { grey, blue } from '@mui/material/colors';
import CollectionSlideItem from './CollectionSlideItem'
import CollectionFilter from './CollectionFilter'
import { CollectionContext } from '../../../../context/collection/context'
import EmptyBox from '../../../../component/EmptyBox'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display: 'flex',
        flexDirection:'column',
    },

    item: {
        paddingTop: theme.spacing(5)
    }
}))



const CollectionList = () => {
    const classes = useStyles()
    const {collections} = useContext(CollectionContext)
    let nonEmptyCollections = collections.filter((item) => item.games.length > 0)
    return (
        <div className = {classes.container}>
            {
                nonEmptyCollections.length == 0? 
                    <EmptyBox label = "This user don't has any collection..."
                        style = {{width: '85%', alignSelf: 'center', marginTop: theme.spacing(3)}}/>
                    :
                    nonEmptyCollections.map((item, index) => (
                        <div className = {classes.item}   key = {''+index}>
                            <CollectionSlideItem collection = {item}/>
                        </div>
                    ))
            }

        </div>
    )
}

export default CollectionList
