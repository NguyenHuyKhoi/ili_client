import { MoreVert, Star } from '@mui/icons-material'
import { Button, Typography ,Avatar} from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useState , useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectCollection } from '../../../context/collection/actions'
import { CollectionContext } from '../../../context/collection/context'
import { theme } from '../../../theme'
import { createUrl } from '../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'white',
        padding: theme.spacing(0.5)
    },
    left: {
        position: 'relative'
    },
    img: {
        height: '100%',
        width: 180,
    },
    right: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    rightTop: {
        flex:1,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: theme.spacing(2)
    },
    rightBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: grey[100],
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(2)
    },
    gameNums: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
        padding: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'black',
        opacity: 0.5,
        zIndex: 99
    }
}))
 
export const CollectionRowItem = (props) => {
    const navigate = useNavigate()
    const {dispatch} = useContext(CollectionContext)
    const classes = useStyles()
    const {collection} = props
    const {title, games, cover, owner} = collection
    const handleView = () => {
        dispatch(selectCollection(collection))
        navigate('/collection/detail/' + collection._id, {replace: false})
    }

    const handleEdit = (e) => {
        e.stopPropagation()
        navigate('/collection/edit/' + collection._id, {replace: false})
    }
    return (
        <div className = {classes.container} style={{backgroundColor: props.selected ? grey[100]:'white'}}
            onClick={handleView}>
            <div className = {classes.left}>
                <img className = {classes.img} src = {createUrl(cover)}/>
                <div className = {classes.gameNums}>
                    <Typography variant = 'caption' sx = {{color: 'white'}}> 
                        {games.length + ' games'}
                     </Typography>
                </div>
            </div>
            <div className = {classes.right}>
                <div className = {classes.rightTop}>
                    <Typography variant = 'subtitle1' sx = {{color: 'black', fontWeight: 'bold', flex: 1}}> 
                        {title}
                    </Typography>
                </div>
                <div className = {classes.rightBottom}>
                    <Avatar src = {createUrl(owner.avatar)} sx={{ width: 24, height: 24 }}  />
                    <Typography variant = 'subtitle1' sx = {{color: '#7D7D7D', flex: 1, ml: theme.spacing(1)}}>
                        {owner.username}
                    </Typography>
                    <Button variant = 'contained' size = 'small' color = 'primary'
                        sx = {{ml: theme.spacing(2), color: 'white', fontWeight: 'bold', textTransform: 'none'}}
                        onClick = {handleEdit}>Edit </Button>
                    <Button variant = 'contained' size = 'small' color = 'success' 
                        sx = {{ml: theme.spacing(2), color: 'white', fontWeight: 'bold', textTransform: 'none'}}>
                        Open
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CollectionRowItem
