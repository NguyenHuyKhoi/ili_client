import { Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Button from '../../../../component/Button'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        padding: theme.spacing(2),
        height: '92vh',
        flexDirection: 'column',
        overflow: 'hidden'
    }
}))


const CollectorInfor = (props) => {
    const classes = useStyles()
    const {collection} = props 
    const {description} = collection
    return (
        <div className = {classes.container}>
            <Typography variant = 'bigLabel' sx = {{color: '#000', p: theme.spacing(1.5), alignSelf: 'center'}}>
                 Description
            </Typography>
            <Divider/>
            <Typography variant= 'btnLabel' sx = {{pt: theme.spacing(2), alignSelf: 'center', flex: 1, color: '#000'}}>
                {
                    description == null || description === '' ? 
                    'Please add a description of your collection.'
                    :
                    description
                }
            </Typography>

          
            <Button
                variant="warning" 
                size = 'small'
                style = {{ marginLeft: theme.spacing(3), width: theme.spacing(15), alignSelf: 'center', marginTop: theme.spacing(5)}}
                onClick = {() => {
                    console.log("Click delete btn")
                    if (props.onDelete) props.onDelete()
                }}
                label = 'Delete'/>
           
        </div>
    )
}

export default CollectorInfor
