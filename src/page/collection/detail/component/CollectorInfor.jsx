import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import OwnerInfor from '../../../../component/OwnerInfor'
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
    const classes = useStyles()
    const {collection} = props
    const { cover, owner, title, description} = collection 
    return (
        <div className = {classes.container}>
            <img className = {classes.img} src = {createUrl(cover)}/>
            <div className = {classes.body} >
                <Typography variant= 'bigLabel' sx = {{color: '#000'}}>
                    {title} 
                </Typography>

                <Typography variant= 'label' sx = {{color: '#000', my: theme.spacing(1)}}>
                    {description == '' || description == null ? 'No description...' : description}
                </Typography>
                <OwnerInfor owner = {owner} />
            </div>
           
        </div>
    )
}

export default CollectorInfor
