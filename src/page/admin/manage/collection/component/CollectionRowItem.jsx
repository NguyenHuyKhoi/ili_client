import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectCollection } from '../../../../../context/collection/actions'
import Button from '../../../../../component/Button'
import { CollectionContext } from '../../../../../context/collection/context'
import { theme } from '../../../../../theme'
import { createUrl } from '../../../../../util/helper'
import ActiveDot from '../../../../../component/ActiveDot'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'white',
        padding: theme.spacing(0.5),
        border: 'solid 1px #000000',
        overflow: 'hidden',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    left: {
        position: 'relative'
    },
    img: {
        aspectRatio: 1.6,
        width: 180,
        objectFit: 'center'
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
        backgroundColor: theme.palette.neutral.main,
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(2)
    },
    gameNums: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
        padding: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: '#000',
        opacity: 0.8,
        zIndex: 99
    }
}))
 
export const CollectionRowItem = (props) => {
    const navigate = useNavigate()
    const {dispatch} = useContext(CollectionContext)
    const classes = useStyles()
    const {collection} = props
    const {title, games, cover, owner, visibility} = collection

    const handleView = (e) => {
        dispatch(selectCollection(collection))
        return navigate('/collection/detail/'+collection._id, {replace: false})
    }

    const handleHide = (e) => {
        e.stopPropagation()
    }

    const handleDelete = (e) => {
        e.stopPropagation()
    }
    return (
        <div className = {classes.container} style={{backgroundColor: props.selected ? grey[100]:'white'}}
            onClick={handleView}>
            <div className = {classes.left}>
                <img className = {classes.img} src = {createUrl(cover)} alt = 'Cover'/>
                <div className = {classes.gameNums}>
                    <Typography variant = 'caption' sx = {{color: 'white'}}> 
                        {games.length + ' games'}
                     </Typography>
                </div>
            </div>
            <div className = {classes.right}>
                <div className = {classes.rightTop}>
                    <Typography variant = 'btnLabel' sx = {{color: 'black', flex: 1}}> 
                        {title}
                    </Typography>
                    <ActiveDot isActive = {visibility ==='public'} labels = {['public', 'private']}/>
                </div>
                <div className = {classes.rightBottom}>
                    <Typography variant = 'label' sx = {{color: '#000', flex: 1, ml: theme.spacing(1)}}>
                        {owner.username}
                    </Typography>
                    {
                        visibility == 'public' && 
                        <Button 
                            variant = 'warning' 
                            size = 'small' 
                            style = {{marginLeft: theme.spacing(2)}}
                            label = 'Hide'
                            onClick = {handleHide}/>
                    }
                  

                  <Button 
                        variant = 'error' 
                        size = 'small' 
                        style = {{marginLeft: theme.spacing(2)}}
                        label = 'Delete'
                        onClick = {handleDelete}/>
              
                </div>
            </div>
        </div>
    )
}

export default CollectionRowItem
