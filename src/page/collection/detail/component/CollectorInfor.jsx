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
        flexDirection: 'column'
    },
    img: {
        widows: '100%',
        height: 360,
        borderRadius: theme.spacing(1.5)
    },
    body: {
        flex:1, 
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1.5),
        marginTop: theme.spacing(2),
        backgroundColor: 'white'
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
                <Typography variant= 'h6' sx = {{color: '#333333', fontWeight: 'bold'}}>
                    {title}
                </Typography>

                <Typography variant= 'subtitle2' sx = {{color: '#5f5f5f', fontWeight: 'bold', my: theme.spacing(1)}}>
                    {description == '' || description == null ? 'No description...' : description}
                </Typography>
                <OwnerInfor owner = {owner} />
            </div>
           
        </div>
    )
}

export default CollectorInfor
