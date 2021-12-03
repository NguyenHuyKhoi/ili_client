import { Add, ClassSharp } from '@mui/icons-material'
import { AppBar, Button, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        width: 350,
        height: 250,
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        boxShadow: `1px 3px 1px #f0f0f0`,
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
}))

const MediaUploadCard = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
           <Button variant='contained' size = 'large' color="primary" aria-label="upload picture">
                Upload
            </Button>
            <Typography variant='h6' sx = {{fontWeight: 'bold', mt: theme.spacing(3)}} >Upload a image</Typography>
        </div>
    )
}

export default MediaUploadCard
