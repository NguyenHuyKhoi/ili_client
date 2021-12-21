import { makeStyles } from '@mui/styles'
import React from 'react'
import OwnerInfor from '../../../../component/OwnerInfor'
import { createUrl } from '../../../../util/helper'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column'
    },
    img: {
        width: '100%',
        height: 250
    },
    body: {
        flex:1, 
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    }
}))


const CollectorInfor = (props) => {
    const classes = useStyles()
    const {collection} = props
    const { cover, owner} = collection 
    return (
        <div className = {classes.container}>
            <img className = {classes.img} src = {createUrl(cover)}/>
            <div className = {classes.body} >
                <OwnerInfor owner = {owner} />
            </div>
           
        </div>
    )
}

export default CollectorInfor
