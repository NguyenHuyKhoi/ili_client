import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '../../../../component/IconButton'
import OwnerInfor from '../../../../component/OwnerInfor'
import VisibilityLabel from '../../../../component/VisibilityLabel'
import { startEditCollection } from '../../../../context/collection/actions'
import { CollectionContext } from '../../../../context/collection/context'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
    },
    img: {
        widows: '100%',
        height: theme.spacing(30)
    },
    body: {
        flex:1, 
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
    }
}))


const CollectorInfor = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {collection, isMine} = props
    const {dispatch} = useContext(CollectionContext)
    const { cover, owner, title, description, visibility, hiddenByAdmin} = collection 

    const handleEdit = () => {
        console.log("Start edit collection", collection);
        dispatch(startEditCollection(collection))
        return navigate('/collection/creator', {replace: false})
    }
    return (
        <div className = {classes.container}>
            <img className = {classes.img} src = {createUrl(cover)} alt = 'Cover'/>
            <div className = {classes.body} >
                <Typography variant= 'bigLabel' sx = {{color: '#000'}}>
                    {title} 
                </Typography>

                <Typography variant= 'label' sx = {{color: '#000', my: theme.spacing(1)}}>
                    {description === '' || description == null ? 'No description...' : description}
                </Typography>
                <VisibilityLabel 
                    visibility = {visibility} 
                    hiddenByAdmin = {hiddenByAdmin}/>
                <div style = {{alignSelf: 'baseline', marginTop: theme.spacing(2), marginBottom: theme.spacing(2)}}>
                    {
                        isMine &&
                        <IconButton icon = 'Edit' variant = 'primary' onClick = {handleEdit}/>
                    }
                   
                </div>
             
                <OwnerInfor owner = {owner} />
            </div>
           
        </div>
    )
}

export default CollectorInfor
