import { MoreVert, Star } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../../../theme'
import CollectionRowItem from '../../component/CollectionRowItem'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        backgroundColor: grey[100],
        display: 'flex',
        flexDirection:'column',
    },
    list: {
        display:'flex',
        flexDirection:'column'
    },
    item: {
        marginBottom: theme.spacing(2),
        display:'flex',
        flexDirection:'column'
    },
    emptyContainer: {
        display: 'flex',
        height: '70vh',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        border: '1px dashed gray'
    },
    emptyImg: {
        width: theme.spacing(20),
        aspectRatio: 1.6
    }
}))


const CollectionList = (props) => {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const {collections} = props
    const [isShowAll, setIsShowAll] = useState(false)
    const handleShowAllChange = () => {
        setIsShowAll(!isShowAll)
    }

    return (
        <div className = {classes.container}>
            <div className = {classes.list} >
            {
                collections.length == 0 ? 
                <div className = {classes.emptyContainer}>
                    <img src = 'https://static.thenounproject.com/png/203873-200.png'
                        className= {classes.emptyImg}/>
                    <Typography variant = 'subtitle1' 
                        sx = {{maxWidth: theme.spacing(50), mt: theme.spacing(3), textAlign: 'center'}}>
                        You don't have yet any collections.Create your first collection by linking
                        kahoots.
                    </Typography>
                </div>
                :
                collections.map((item, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <CollectionRowItem collection = {item}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default CollectionList
