import { Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
import { createUrl } from '../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        boxShadow: `1px 3px 1px #f0f0f0`,
        borderRadius: theme.spacing(0.6),
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        position: 'relative'
    },
    img: {
        width: '100%',
        maxHeight: '100%'
    }
}))

const MediaUploadCard = (props) => {
    const classes = useStyles()
    const {image} = props
    //console.log('src :', src)
    const handleSelectImage = (e) => {
        if (e.target.files.length > 0) {
            let file = e.target.files[0]
            if (props.onSelectImage) {
                props.onSelectImage(file)
            }
        }
    }

    const handleRemoveImage = () => {
        if (props.onRemoveImage) {
            props.onRemoveImage()
        }
    }

    return (
        <div className = {classes.container}>
            {
                image == undefined? 
                <>
                <Button variant='contained' size = 'large' color="primary" aria-label="upload picture"
                component="label"
                sx = {{color: 'white', fontWeight: 'bold', textTransform: 'none'}}>
                    Upload
                    <input
                        type="file"
                        accept="image/*"
                        onChange= {handleSelectImage}
                        hidden
                    />
                </Button>
                <Typography variant='h6' sx = {{color: '#757575', mt: theme.spacing(3)}} >
                    Upload a image
                </Typography>
                </>
                :
                <>
                    <img src = {createUrl(image)} className = {classes.img}/>
                    <Button 
                        variant = 'contained'
                        onClick = {handleRemoveImage}
                        size = 'small'
                        sx = {{
                            color: '#333333',
                            backgroundColor: 'white',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            position: 'absolute', 
                            bottom: 10,
                            right: 10
                        }}>
                        Remove
                    </Button>
                </>
            }
         
        </div>
    )
}

export default MediaUploadCard
